import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyToken, ADMIN_AUTH_COOKIE_NAME } from '@/lib/auth'

async function requireSuperAdmin(req: NextRequest) {
  const token = req.cookies.get(ADMIN_AUTH_COOKIE_NAME)?.value
  if (!token) return null
  const decoded = await verifyToken(token)
  if (!decoded) return null
  if (decoded.role !== 'SUPER_ADMIN') return null
  return decoded
}

export async function GET(req: NextRequest) {
  const admin = requireSuperAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const settings = await prisma.setting.findFirst()
    return NextResponse.json({ success: true, data: settings })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const admin = requireSuperAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { appName, appLogo, appDescription, contact, email, website, developedBy } = body

    const existing = await prisma.setting.findFirst({ select: { id: true } })

    const data = {
      ...(appName        !== undefined && { appName }),
      ...(appLogo        !== undefined && { appLogo }),
      ...(appDescription !== undefined && { appDescription }),
      ...(contact        !== undefined && { contact }),
      ...(email          !== undefined && { email }),
      ...(website        !== undefined && { website }),
      ...(developedBy    !== undefined && { developedBy }),
    }

    let settings
    if (existing) {
      settings = await prisma.setting.update({ where: { id: existing.id }, data })
    } else {
      settings = await prisma.setting.create({ data })
    }

    return NextResponse.json({ success: true, data: settings })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
