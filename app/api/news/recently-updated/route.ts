import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const limit = parseInt(req.nextUrl.searchParams.get('limit') ?? '4')

    const news = await prisma.news.findMany({
      where: { isActive: true, status: 'PUBLISHED' },
      orderBy: { updatedAt: 'desc' },
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        updatedAt: true,
        category: { select: { id: true, name: true, nameEnglish: true, slug: true } },
      },
    })

    return NextResponse.json({ success: true, data: news })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
