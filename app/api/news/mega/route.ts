import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(_req: NextRequest) {
  try {
    const news = await prisma.news.findMany({
      where: { isActive: true, status: 'PUBLISHED' },
      orderBy: { newsScore: { finalScore: 'desc' } },
      take: 6,
      select: {
        id: true,
        title: true,
        slug: true,
        featuredImage: true,
        category: { select: { name: true, nameEnglish: true, slug: true } },
      },
    })

    return NextResponse.json({ success: true, data: news })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
