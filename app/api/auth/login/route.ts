import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyPassword, generateToken, AUTH_COOKIE_NAME, ADMIN_AUTH_COOKIE_NAME } from '@/lib/auth'

const STAFF_ROLES = ['SUPER_ADMIN', 'MODERATOR', 'REPORTER', 'AD_MANAGER']

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } })
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    if (!user.isActive) {
      return NextResponse.json({ error: 'Account deactivated' }, { status: 401 })
    }

    await prisma.user.update({ where: { id: user.id }, data: { lastLogin: new Date() } })

    const token = generateToken(user.id, user.email, user.role)
    const isStaff = STAFF_ROLES.includes(user.role)

    const res = NextResponse.json({
      success: true,
      token,
      isStaff,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    })

    const cookieOpts = { httpOnly: true, secure: false, maxAge: 60 * 60 * 24 * 7, path: '/', sameSite: 'lax' as const }
    res.cookies.set(AUTH_COOKIE_NAME, token, cookieOpts)
    if (isStaff) res.cookies.set(ADMIN_AUTH_COOKIE_NAME, token, cookieOpts)

    return res
  } catch (err: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
