import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyPassword, generateToken, ADMIN_AUTH_COOKIE_NAME } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    if (!process.env.JWT_SECRET) {
      console.error('[Login] JWT_SECRET is not set in environment variables')
      return NextResponse.json(
        { error: 'Server misconfigured: JWT_SECRET missing. Check your .env file.' },
        { status: 500 }
      )
    }

    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email.trim().toLowerCase(),
        role: { in: ['SUPER_ADMIN', 'MODERATOR'] },
      },
    })

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    if (!user.isActive) {
      return NextResponse.json({ error: 'Account deactivated' }, { status: 401 })
    }

    await prisma.user.update({ where: { id: user.id }, data: { lastLogin: new Date() } })

    const token = generateToken(user.id, user.email, user.role)

    const res = NextResponse.json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    })

    res.cookies.set(ADMIN_AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax',
    })

    return res
  } catch (err: any) {
    console.error('[Login] Unexpected error:', err?.message ?? err)
    return NextResponse.json(
      { error: `Login failed: ${err?.message ?? 'Unknown error'}` },
      { status: 500 }
    )
  }
}
