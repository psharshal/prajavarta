import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { geoFromRequest, GEO_COOKIE, GEO_BOOSTS, SEGMENT_CATEGORY_ORDER } from '@/lib/geo'

const NEWS_INCLUDE = {
  category: { select: { id: true, name: true, nameEnglish: true, slug: true } },
  newsScore: { select: { finalScore: true, viewsLast2Hrs: true } },
  newsCategories: { include: { category: { select: { slug: true } } } },
}

export async function GET(req: NextRequest) {
  try {
    const geo = await geoFromRequest(req)
    const boosts = GEO_BOOSTS[geo.segment]
    const categoryOrder = SEGMENT_CATEGORY_ORDER[geo.segment]

    // Hero: pin_to_homepage first, then highest finalScore
    const heroNews = await prisma.news.findMany({
      where: { isActive: true, status: 'PUBLISHED' },
      orderBy: [
        { pinToHomepage: 'desc' },
        { newsScore: { finalScore: 'desc' } },
        { publishedDate: 'desc' },
      ],
      take: 1,
      include: NEWS_INCLUDE,
    })

    // Secondary: next 2 after hero, different category from hero
    const heroId = heroNews[0]?.id
    const heroCategoryId = heroNews[0]?.categoryId
    const secondary = await prisma.news.findMany({
      where: {
        isActive: true,
        status: 'PUBLISHED',
        id: { not: heroId ?? 0 },
        categoryId: { not: heroCategoryId ?? undefined },
      },
      orderBy: [{ newsScore: { finalScore: 'desc' } }, { publishedDate: 'desc' }],
      take: 2,
      include: NEWS_INCLUDE,
    })

    // Trending: top 5 by velocity (site-wide, not personalised)
    const trending = await prisma.news.findMany({
      where: { isActive: true, status: 'PUBLISHED' },
      orderBy: [{ newsScore: { viewsLast2Hrs: 'desc' } }, { viewCount: 'desc' }],
      take: 5,
      include: NEWS_INCLUDE,
    })

    // Mini trending (editorial-flagged)
    const miniTrending = await prisma.news.findMany({
      where: { isActive: true, status: 'PUBLISHED', isMiniTrendingNews: true },
      orderBy: { publishedDate: 'desc' },
      take: 5,
      select: { id: true, title: true, slug: true },
    })

    // Categories wise data — ordered per geo segment
    const categories = await prisma.category.findMany({
      where: { isActive: true, slug: { not: 'home-page' } },
      orderBy: { sortOrder: 'asc' },
    })

    // Order categories by segment preference
    const orderedCategories = [
      ...categoryOrder.map(slug => categories.find(c => c.nameEnglish?.toLowerCase() === slug || c.slug === slug)).filter(Boolean),
      ...categories.filter(c => !categoryOrder.includes(c.nameEnglish?.toLowerCase() ?? '') && !categoryOrder.includes(c.slug)),
    ].slice(0, 6)

    const categoriesWiseData: Record<string, any[]> = {}
    const usedIds = new Set([heroId, ...secondary.map(n => n.id)])

    for (const cat of orderedCategories as any[]) {
      if (!cat) continue
      const catNews = await prisma.news.findMany({
        where: {
          isActive: true,
          status: 'PUBLISHED',
          id: { notIn: Array.from(usedIds) as number[] },
          OR: [
            { categoryId: cat.id },
            { newsCategories: { some: { categoryId: cat.id } } },
          ],
        },
        orderBy: [{ newsScore: { finalScore: 'desc' } }, { publishedDate: 'desc' }],
        take: 4,
        include: NEWS_INCLUDE,
      })
      if (catNews.length > 0) {
        categoriesWiseData[cat.name] = catNews
        catNews.forEach(n => usedIds.add(n.id))
      }
    }

    // Recommended
    const recommended = await prisma.news.findMany({
      where: { isActive: true, status: 'PUBLISHED', id: { notIn: Array.from(usedIds) as number[] } },
      orderBy: [{ newsScore: { finalScore: 'desc' } }, { publishedDate: 'desc' }],
      take: 6,
      include: NEWS_INCLUDE,
    })

    // Ad banner
    const banner = await prisma.mainAdvertisementBanner.findFirst({ orderBy: { id: 'desc' } })

    const res = NextResponse.json({
      success: true,
      data: {
        banner,
        one_latest_news: heroNews,
        latest_news: secondary,
        trending_news: trending,
        mini_trending_news: miniTrending,
        categories_wise_data: categoriesWiseData,
        recommended_news: recommended,
        geo: { segment: geo.segment, city: geo.city },
      },
    })

    // Set geo cookie (30 days)
    res.cookies.set(GEO_COOKIE, encodeURIComponent(JSON.stringify(geo)), {
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: false,
      path: '/',
    })

    return res
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
