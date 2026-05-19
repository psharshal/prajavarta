import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get('slug')
    const page = parseInt(req.nextUrl.searchParams.get('page') ?? '1')
    const limit = parseInt(req.nextUrl.searchParams.get('limit') ?? '20')
    const skip = (page - 1) * limit

    if (!slug) return NextResponse.json({ success: false, error: 'slug required' }, { status: 400 })

    const category = await prisma.category.findFirst({
      where: { OR: [{ slug }, { nameEnglish: { equals: slug } }] },
    })
    if (!category) return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 })

    const where = {
      isActive: true,
      status: 'PUBLISHED' as const,
      OR: [
        { categoryId: category.id },
        { newsCategories: { some: { categoryId: category.id } } },
      ],
    }

    const include = {
      category: { select: { id: true, name: true, nameEnglish: true, slug: true } },
      newsScore: { select: { finalScore: true, viewsLast2Hrs: true } },
      district: { select: { id: true, name: true } },
    }

    const [total, hero, latest, mostRead, trending] = await Promise.all([
      prisma.news.count({ where }),
      prisma.news.findMany({ where, orderBy: [{ pinToHomepage: 'desc' }, { newsScore: { finalScore: 'desc' } }], take: 1, include }),
      prisma.news.findMany({ where, orderBy: [{ newsScore: { finalScore: 'desc' } }, { publishedDate: 'desc' }], skip, take: limit, include }),
      prisma.news.findMany({ where, orderBy: { viewCount: 'desc' }, take: 5, include }),
      prisma.news.findMany({ where, orderBy: { newsScore: { viewsLast2Hrs: 'desc' } }, take: 5, include }),
    ])

    // Evergreen: oldest high-view articles (long-form reference content)
    const evergreen = await prisma.news.findMany({
      where,
      orderBy: { viewCount: 'desc' },
      skip: 5,
      take: 4,
      include,
    })

    return NextResponse.json({
      success: true,
      data: { category, hero: hero[0] ?? null, latest, mostRead, trending, evergreen },
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
