import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const limit = parseInt(req.nextUrl.searchParams.get('limit') ?? '5')

    const news = await prisma.news.findMany({
      where: { isMiniTrendingNews: true, status: 'PUBLISHED', isActive: true },
      orderBy: { publishedDate: 'desc' },
      take: limit,
      select: { id: true, title: true, slug: true },
    })

    return NextResponse.json({ success: true, data: news })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
