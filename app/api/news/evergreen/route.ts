import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const limit = parseInt(searchParams.get('limit') ?? '4')
    const categorySlug = searchParams.get('categorySlug') ?? null

    const where: any = { isActive: true, status: 'PUBLISHED' }

    if (categorySlug) {
      const category = await prisma.category.findFirst({ where: { slug: categorySlug } })
      if (category) {
        where.OR = [
          { categoryId: category.id },
          { newsCategories: { some: { categoryId: category.id } } },
        ]
      }
    }

    const news = await prisma.news.findMany({
      where,
      orderBy: { viewCount: 'desc' },
      skip: 5,
      take: limit,
      include: {
        category: { select: { id: true, name: true, nameEnglish: true, slug: true } },
      },
    })

    return NextResponse.json({ success: true, data: news })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
