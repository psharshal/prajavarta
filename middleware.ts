import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, ADMIN_AUTH_COOKIE_NAME } from '@/lib/auth'

const PUBLIC_ADMIN_PATHS = ['/admin/login']
const ADMIN_PATH = '/admin'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Protect /admin/* routes (except login)
  if (pathname.startsWith(ADMIN_PATH) && !PUBLIC_ADMIN_PATHS.includes(pathname)) {
    const token = req.cookies.get(ADMIN_AUTH_COOKIE_NAME)?.value
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
    const decoded = verifyToken(token)
    if (!decoded || !['SUPER_ADMIN', 'MODERATOR'].includes(decoded.role)) {
      const res = NextResponse.redirect(new URL('/admin/login', req.url))
      res.cookies.set(ADMIN_AUTH_COOKIE_NAME, '', { maxAge: 0, path: '/' })
      return res
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
