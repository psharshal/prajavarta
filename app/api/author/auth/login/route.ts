import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyPassword, generateToken, AUTHOR_AUTH_COOKIE_NAME } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email.trim().toLowerCase(),
        role: 'REPORTER',
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
      user: {
        id: user.id,
        name: user.name,
        nameEnglish: user.nameEnglish,
        email: user.email,
        role: user.role,
        image: user.image,
        designation: user.designation,
        bio: user.bio,
      },
    })

    res.cookies.set(AUTHOR_AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax',
    })

    return res
  } catch (err: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
