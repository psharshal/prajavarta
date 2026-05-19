import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// P1: same category + same district  (slots 1-3)
// P2: same category + different district  (slots 4-5)
// P3: trending pick  (slot 6)
export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get('slug')
    if (!slug) return NextResponse.json({ success: false, error: 'slug required' }, { status: 400 })

    const article = await prisma.news.findUnique({
      where: { slug },
      select: { id: true, categoryId: true, districtId: true },
    })
    if (!article) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })

    const base = { isActive: true, id: { not: article.id } }

    // P1 — same category + same district
    const p1 = article.categoryId && article.districtId
      ? await prisma.news.findMany({
          where: { ...base, categoryId: article.categoryId, districtId: article.districtId },
          orderBy: { publishedDate: 'desc' },
          take: 3,
          include: { category: true },
        })
      : []

    // P2 — same category, other districts (exclude P1 IDs)
    const p1Ids = p1.map(n => n.id)
    const p2 = article.categoryId
      ? await prisma.news.findMany({
          where: {
            ...base,
            categoryId: article.categoryId,
            id: { not: article.id, notIn: p1Ids.length ? p1Ids : undefined },
          },
          orderBy: { publishedDate: 'desc' },
          take: 2,
          include: { category: true },
        })
      : []

    // P3 — trending pick (slot 6)
    const usedIds = [article.id, ...p1Ids, ...p2.map(n => n.id)]
    const p3 = await prisma.news.findMany({
      where: { isActive: true, id: { notIn: usedIds } },
      orderBy: [{ newsScore: { viewsLast2Hrs: 'desc' } }, { viewCount: 'desc' }],
      take: 1,
      include: { category: true },
    })

    return NextResponse.json({
      success: true,
      data: [...p1, ...p2, ...p3],
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
