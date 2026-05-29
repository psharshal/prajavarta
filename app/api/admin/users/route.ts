import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyToken, ADMIN_AUTH_COOKIE_NAME, hashPassword } from '@/lib/auth'

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get(ADMIN_AUTH_COOKIE_NAME)?.value
  if (!token) return null
  const decoded = await verifyToken(token)
  if (!decoded) return null
  if (!['SUPER_ADMIN', 'MODERATOR'].includes(decoded.role)) return null
  return decoded
}

function toInt(v: any): number | null {
  const n = parseInt(String(v ?? ''), 10)
  return isNaN(n) ? null : n
}

const ROLE_RANK: Record<string, number> = {
  SUPER_ADMIN: 4,
  MODERATOR: 3,
  AD_MANAGER: 2,
  REPORTER: 1,
  USER: 0,
}

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { searchParams } = req.nextUrl
    const page   = parseInt(searchParams.get('page') ?? '1')
    const limit  = parseInt(searchParams.get('limit') ?? '20')
    const search = searchParams.get('search') ?? ''
    const role   = searchParams.get('role')
    const skip   = (page - 1) * limit

    const where: any = {
      ...(search && {
        OR: [
          { name: { contains: search } },
          { email: { contains: search } },
        ],
      }),
      ...(role && { role: role as any }),
    }

    const [total, data] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true, email: true, name: true, nameEnglish: true,
          role: true, isActive: true, image: true, designation: true,
          bio: true, createdAt: true, lastLogin: true,
        },
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
  const admin = await requireAdmin(req)
  if (!admin || admin.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { email, password, name, nameEnglish, role, designation, bio, image } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'email and password required' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return NextResponse.json({ error: 'Email already exists' }, { status: 409 })

    const passwordHash = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email: email.trim().toLowerCase(),
        passwordHash,
        name: name?.trim() ?? null,
        nameEnglish: nameEnglish?.trim() ?? null,
        role: (role as any) ?? 'USER',
        designation: designation?.trim() ?? null,
        bio: bio?.trim() ?? null,
        image: image ?? null,
      },
      select: {
        id: true, email: true, name: true, nameEnglish: true,
        role: true, isActive: true, designation: true, createdAt: true,
      },
    })

    return NextResponse.json({ success: true, data: user }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const admin = await requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const id = toInt(body.id)
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

    // Prevent lowering own role
    if (body.role && id === admin.userId) {
      const newRank  = ROLE_RANK[body.role] ?? 0
      const selfRank = ROLE_RANK[admin.role] ?? 0
      if (newRank < selfRank) {
        return NextResponse.json({ error: 'Cannot lower your own role' }, { status: 400 })
      }
    }

    const updateData: any = {}
    if (body.name        !== undefined) updateData.name = body.name?.trim()
    if (body.nameEnglish !== undefined) updateData.nameEnglish = body.nameEnglish?.trim()
    if (body.designation !== undefined) updateData.designation = body.designation?.trim()
    if (body.bio         !== undefined) updateData.bio = body.bio?.trim()
    if (body.image       !== undefined) updateData.image = body.image
    if (body.isActive    !== undefined) updateData.isActive = body.isActive
    if (body.role        !== undefined) updateData.role = body.role as any
    if (body.password) updateData.passwordHash = await hashPassword(body.password)

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true, email: true, name: true, nameEnglish: true,
        role: true, isActive: true, designation: true, updatedAt: true,
      },
    })

    return NextResponse.json({ success: true, data: user })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const admin = await requireAdmin(req)
  if (!admin || admin.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const id = toInt(req.nextUrl.searchParams.get('id'))
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

    if (id === admin.userId) {
      return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 })
    }

    await prisma.user.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
