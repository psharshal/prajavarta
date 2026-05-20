import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyToken, AUTH_COOKIE_NAME } from '@/lib/auth'

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params
    if (!slug) return NextResponse.json({ success: false, error: 'slug required' }, { status: 400 })

    const article = await prisma.news.findUnique({
      where: { slug },
      include: {
        author:        { select: { id: true, name: true, nameEnglish: true, image: true, bio: true, designation: true } },
        district:      { select: { id: true, name: true, nameEnglish: true } },
        location:      { select: { id: true, name: true } },
        category:      { select: { id: true, name: true, nameEnglish: true, slug: true } },
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

    return NextResponse.json({
      success: true,
      data: {
        article,
        categoryList: article.newsCategories.map(nc => nc.category),
        saved,
      },
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
