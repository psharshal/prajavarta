import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyToken, ADMIN_AUTH_COOKIE_NAME } from '@/lib/auth'

function requireAdmin(req: NextRequest) {
  const token = req.cookies.get(ADMIN_AUTH_COOKIE_NAME)?.value
  if (!token) return null
  const decoded = verifyToken(token)
  if (!decoded) return null
  if (!['SUPER_ADMIN', 'MODERATOR'].includes(decoded.role)) return null
  return decoded
}

function toInt(v: any): number | null {
  const n = parseInt(String(v ?? ''), 10)
  return isNaN(n) ? null : n
}

export async function GET(req: NextRequest) {
  const admin = requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { searchParams } = req.nextUrl
    const page   = parseInt(searchParams.get('page') ?? '1')
    const limit  = parseInt(searchParams.get('limit') ?? '20')
    const search = searchParams.get('search') ?? ''
    const skip   = (page - 1) * limit

    const where: any = search
      ? { OR: [{ name: { contains: search } }, { nameEnglish: { contains: search } }] }
      : {}

    const [total, data] = await Promise.all([
      prisma.district.count({ where }),
      prisma.district.findMany({
        where,
        orderBy: { name: 'asc' },
        skip,
        take: limit,
      }),
    ])

    return NextResponse.json({
      success: true,
      data,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const admin = requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { name, nameEnglish } = body
    if (!name) return NextResponse.json({ error: 'name required' }, { status: 400 })

    const district = await prisma.district.create({
      data: {
        name: name.trim(),
        nameEnglish: nameEnglish?.trim() ?? null,
      },
    })

    return NextResponse.json({ success: true, data: district }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const admin = requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const id = toInt(body.id)
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

    const district = await prisma.district.update({
      where: { id },
      data: {
        ...(body.name        !== undefined && { name: body.name.trim() }),
        ...(body.nameEnglish !== undefined && { nameEnglish: body.nameEnglish?.trim() }),
        ...(body.isActive    !== undefined && { isActive: body.isActive }),
      },
    })

    return NextResponse.json({ success: true, data: district })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const admin = requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const id = toInt(req.nextUrl.searchParams.get('id'))
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

    // Check no news is attached to this district
    const newsCount = await prisma.news.count({ where: { districtId: id } })
    if (newsCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete: ${newsCount} news article(s) are assigned to this district` },
        { status: 409 },
      )
    }

    await prisma.district.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
