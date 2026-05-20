import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const limit = parseInt(searchParams.get('limit') ?? '6')
    const excludeParam = searchParams.get('excludeIds') ?? ''
    const excludeIds = excludeParam
      ? excludeParam.split(',').map(Number).filter(n => !isNaN(n) && n > 0)
      : []

    const news = await prisma.news.findMany({
      where: {
        isActive: true,
        status: 'PUBLISHED',
        ...(excludeIds.length ? { id: { notIn: excludeIds } } : {}),
      },
      orderBy: [
        { newsScore: { finalScore: 'desc' } },
        { publishedDate: 'desc' },
      ],
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
