import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const includeHome = req.nextUrl.searchParams.get('includeHome') === 'true'

    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
        ...(includeHome ? {} : { slug: { not: 'home-page' } }),
      },
      orderBy: { sortOrder: 'asc' },
      select: { id: true, name: true, nameEnglish: true, slug: true, image: true, parentId: true },
    })

    return NextResponse.json({ success: true, data: categories })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
