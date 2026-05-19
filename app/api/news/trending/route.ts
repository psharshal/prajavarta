import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const limit = parseInt(searchParams.get('limit') ?? '5')
    const categorySlug = searchParams.get('category') ?? null

    const where: any = { isActive: true }

    if (categorySlug) {
      const category = await prisma.category.findFirst({ where: { slug: categorySlug } })
      if (category) {
        where.newsCategories = { some: { categoryId: category.id } }
      }
    }

    // Trending = highest views in last 2 hours (from NewsScore), fallback to viewCount
    const news = await prisma.news.findMany({
      where,
      orderBy: [
        { newsScore: { viewsLast2Hrs: 'desc' } },
        { viewCount: 'desc' },
        { publishedDate: 'desc' },
      ],
      take: limit,
      include: {
        category: { select: { id: true, name: true, nameEnglish: true, slug: true } },
        newsScore: { select: { viewsLast2Hrs: true, finalScore: true } },
      },
    })

    return NextResponse.json({ success: true, data: news })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
