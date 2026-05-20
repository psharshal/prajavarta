import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const tag = searchParams.get('tag') ?? ''
    const page = parseInt(searchParams.get('page') ?? '1')
    const limit = parseInt(searchParams.get('limit') ?? '12')
    const skip = (page - 1) * limit

    if (!tag) return NextResponse.json({ success: false, error: 'tag param required' }, { status: 400 })

    const where = {
      isActive: true,
      status: 'PUBLISHED' as const,
      tags: { contains: tag },
    }

    const [total, data] = await Promise.all([
      prisma.news.count({ where }),
      prisma.news.findMany({
        where,
        orderBy: { publishedDate: 'desc' },
        skip,
        take: limit,
        include: {
          category: { select: { id: true, name: true, nameEnglish: true, slug: true } },
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      data,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
