import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get('slug')
    const page = parseInt(req.nextUrl.searchParams.get('page') ?? '1')
    const limit = parseInt(req.nextUrl.searchParams.get('limit') ?? '20')
    const skip = (page - 1) * limit

    if (!slug) return NextResponse.json({ success: false, error: 'slug required' }, { status: 400 })

    // City maps to District in our geography model
    const district = await prisma.district.findFirst({
      where: {
        OR: [
          { nameEnglish: { equals: slug } },
          { name: decodeURIComponent(slug) },
        ],
      },
    })
    if (!district) return NextResponse.json({ success: false, error: 'City not found' }, { status: 404 })

    const where = {
      isActive: true,
      status: 'PUBLISHED' as const,
      districtId: district.id,
    }

    const include = {
      category: { select: { id: true, name: true, nameEnglish: true, slug: true } },
      newsScore: { select: { finalScore: true, viewsLast2Hrs: true } },
    }

    const [total, hero, latest, mostRead, trending] = await Promise.all([
      prisma.news.count({ where }),
      prisma.news.findMany({ where, orderBy: [{ pinToHomepage: 'desc' }, { newsScore: { finalScore: 'desc' } }], take: 1, include }),
      prisma.news.findMany({ where, orderBy: [{ newsScore: { finalScore: 'desc' } }, { publishedDate: 'desc' }], skip, take: limit, include }),
      prisma.news.findMany({ where, orderBy: { viewCount: 'desc' }, take: 5, include }),
      prisma.news.findMany({ where, orderBy: { newsScore: { viewsLast2Hrs: 'desc' } }, take: 5, include }),
    ])

    // By-topic sections within this city
    const categories = await prisma.category.findMany({
      where: { isActive: true, slug: { not: 'home-page' } },
      orderBy: { sortOrder: 'asc' },
      take: 6,
    })

    const byTopic: Record<string, any[]> = {}
    for (const cat of categories) {
      const topicNews = await prisma.news.findMany({
        where: { ...where, OR: [{ categoryId: cat.id }, { newsCategories: { some: { categoryId: cat.id } } }] },
        orderBy: [{ newsScore: { finalScore: 'desc' } }, { publishedDate: 'desc' }],
        take: 3,
        include,
      })
      if (topicNews.length > 0) byTopic[cat.name] = topicNews
    }

    return NextResponse.json({
      success: true,
      data: { district, hero: hero[0] ?? null, latest, mostRead, trending, byTopic },
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
