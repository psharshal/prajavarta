import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyToken, AUTH_COOKIE_NAME } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value
  if (!token) return NextResponse.json({ user: null }, { status: 401 })

  const decoded = verifyToken(token)
  if (!decoded) return NextResponse.json({ user: null }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: { id: true, name: true, nameEnglish: true, email: true, role: true, image: true },
  })

  return NextResponse.json({ success: true, user })
}
