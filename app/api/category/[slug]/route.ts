import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params
    if (!slug) return NextResponse.json({ success: false, error: 'slug required' }, { status: 400 })

    const category = await prisma.category.findFirst({
      where: {
        isActive: true,
        OR: [{ slug }, { nameEnglish: slug }],
      },
    })

    if (!category) return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 })

    const catFilter = {
      OR: [
        { categoryId: category.id },
        { newsCategories: { some: { categoryId: category.id } } },
      ],
    }
    const base = { isActive: true, status: 'PUBLISHED' as const }

    const [hero, latest, mostRead, trending, evergreen, recentlyUpdated] = await Promise.all([
      prisma.news.findFirst({
        where: { ...base, ...catFilter },
        orderBy: { publishedDate: 'desc' },
        include: { category: { select: { id: true, name: true, nameEnglish: true, slug: true } } },
      }),
      prisma.news.findMany({
        where: { ...base, ...catFilter },
        orderBy: { publishedDate: 'desc' },
        take: 6,
        include: { category: { select: { id: true, name: true, nameEnglish: true, slug: true } } },
      }),
      prisma.news.findMany({
        where: { ...base, ...catFilter },
        orderBy: { viewCount: 'desc' },
        take: 5,
        include: { category: { select: { id: true, name: true, nameEnglish: true, slug: true } } },
      }),
      prisma.news.findMany({
        where: { ...base, ...catFilter },
        orderBy: [{ newsScore: { viewsLast2Hrs: 'desc' } }, { viewCount: 'desc' }],
        take: 5,
        include: { category: { select: { id: true, name: true, nameEnglish: true, slug: true } } },
      }),
      prisma.news.findMany({
        where: { ...base, ...catFilter },
        orderBy: { viewCount: 'desc' },
        skip: 5,
        take: 4,
        include: { category: { select: { id: true, name: true, nameEnglish: true, slug: true } } },
      }),
      prisma.news.findMany({
        where: { ...base, ...catFilter },
        orderBy: { updatedAt: 'desc' },
        take: 4,
        select: {
          id: true,
          title: true,
          slug: true,
          updatedAt: true,
          category: { select: { id: true, name: true, nameEnglish: true, slug: true } },
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      data: { category, hero, latest, mostRead, trending, evergreen, recentlyUpdated },
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
