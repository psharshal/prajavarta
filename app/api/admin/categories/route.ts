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

async function buildUniqueSlug(base: string, excludeId?: number): Promise<string> {
  const slug = (base ?? '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '') || `category-${Date.now()}`

  let candidate = slug
  let i = 1
  while (true) {
    const existing = await prisma.category.findFirst({
      where: { slug: candidate, ...(excludeId ? { id: { not: excludeId } } : {}) },
      select: { id: true },
    })
    if (!existing) return candidate
    candidate = `${slug}-${i++}`
  }
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

    const where: any = search ? { name: { contains: search } } : {}

    const [total, data] = await Promise.all([
      prisma.category.count({ where }),
      prisma.category.findMany({
        where,
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
        include: { parent: { select: { id: true, name: true, nameEnglish: true } } },
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
    const { name, nameEnglish, parentId, sortOrder } = body
    if (!name) return NextResponse.json({ error: 'name required' }, { status: 400 })

    const slug = await buildUniqueSlug(nameEnglish ?? name)

    const category = await prisma.category.create({
      data: {
        name: name.trim(),
        nameEnglish: nameEnglish?.trim() ?? null,
        slug,
        parentId: toInt(parentId),
        sortOrder: toInt(sortOrder) ?? 0,
      },
    })

    return NextResponse.json({ success: true, data: category }, { status: 201 })
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

    const slug = body.nameEnglish || body.name
      ? await buildUniqueSlug(body.nameEnglish ?? body.name, id)
      : undefined

    const category = await prisma.category.update({
      where: { id },
      data: {
        ...(body.name        !== undefined && { name: body.name.trim() }),
        ...(body.nameEnglish !== undefined && { nameEnglish: body.nameEnglish.trim() }),
        ...(slug             !== undefined && { slug }),
        ...(body.parentId    !== undefined && { parentId: toInt(body.parentId) }),
        ...(body.sortOrder   !== undefined && { sortOrder: toInt(body.sortOrder) ?? 0 }),
        ...(body.isActive    !== undefined && { isActive: body.isActive }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.image       !== undefined && { image: body.image }),
      },
    })

    return NextResponse.json({ success: true, data: category })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const admin = requireAdmin(req)
  if (!admin || admin.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const id = toInt(req.nextUrl.searchParams.get('id'))
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

    await prisma.category.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
