import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyToken, AUTH_COOKIE_NAME } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get('slug')
    if (!slug) return NextResponse.json({ success: false, error: 'slug required' }, { status: 400 })

    const article = await prisma.news.findUnique({
      where: { slug },
      include: {
        author:       { select: { id: true, name: true, nameEnglish: true, image: true, bio: true, designation: true } },
        district:     { select: { id: true, name: true, nameEnglish: true } },
        location:     { select: { id: true, name: true } },
        category:     { select: { id: true, name: true, nameEnglish: true, slug: true } },
        galleryImages: true,
        newsCategories: { include: { category: { select: { id: true, name: true, nameEnglish: true, slug: true } } } },
      },
    })

    if (!article) return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 })

    // Check if saved by current user
    let saved = false
    const token = req.cookies.get(AUTH_COOKIE_NAME)?.value
    if (token) {
      const decoded = verifyToken(token)
      if (decoded) {
        const savedArticle = await prisma.savedArticle.findUnique({
          where: { userId_newsId: { userId: decoded.userId, newsId: article.id } },
        })
        saved = Boolean(savedArticle)
      }
    }

    // Increment view count (fire and forget)
    prisma.news.update({ where: { id: article.id }, data: { viewCount: { increment: 1 } } }).catch(() => {})

    // Related: P1 same category+district, P2 same category other district, P3 trending
    const base = { isActive: true, status: 'PUBLISHED' as const, id: { not: article.id } }
    const p1 = await prisma.news.findMany({
      where: { ...base, categoryId: article.categoryId, districtId: article.districtId },
      orderBy: { publishedDate: 'desc' },
      take: 3,
      include: { category: { select: { id: true, name: true, slug: true } } },
    })
    const p1Ids = p1.map(n => n.id)
    const p2 = await prisma.news.findMany({
      where: { ...base, categoryId: article.categoryId, id: { not: article.id, notIn: p1Ids.length ? p1Ids : undefined } },
      orderBy: { publishedDate: 'desc' },
      take: 2,
      include: { category: { select: { id: true, name: true, slug: true } } },
    })
    const usedIds = [article.id, ...p1Ids, ...p2.map(n => n.id)]
    const p3 = await prisma.news.findMany({
      where: { isActive: true, id: { notIn: usedIds } },
      orderBy: { newsScore: { viewsLast2Hrs: 'desc' } },
      take: 1,
      include: { category: { select: { id: true, name: true, slug: true } } },
    })

    // Trending for sidebar
    const trendingNews = await prisma.news.findMany({
      where: { isActive: true, status: 'PUBLISHED' },
      orderBy: [{ newsScore: { viewsLast2Hrs: 'desc' } }, { viewCount: 'desc' }],
      take: 5,
      include: { category: { select: { id: true, name: true, slug: true } } },
    })

    const mostReadNews = await prisma.news.findMany({
      where: { isActive: true, status: 'PUBLISHED' },
      orderBy: { viewCount: 'desc' },
      take: 5,
      include: { category: { select: { id: true, name: true, slug: true } } },
    })

    return NextResponse.json({
      success: true,
      data: {
        article,
        categoryList: article.newsCategories.map(nc => nc.category),
        relatedNews: [...p1, ...p2, ...p3],
        trendingNews,
        mostReadNews,
        saved,
      },
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
