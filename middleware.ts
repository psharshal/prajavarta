import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, ADMIN_AUTH_COOKIE_NAME } from '@/lib/auth'

const PUBLIC_ADMIN_PATHS = ['/admin/login']
const ADMIN_PATH = '/admin'

// Paths that require elevated roles beyond REPORTER/AD_MANAGER
const SUPER_MOD_ONLY = ['/admin/users', '/admin/categories', '/admin/settings']
const AD_MANAGER_ALLOWED = ['/admin', '/admin/ads']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith(ADMIN_PATH) || PUBLIC_ADMIN_PATHS.includes(pathname)) {
    return NextResponse.next()
  }

  const token = req.cookies.get(ADMIN_AUTH_COOKIE_NAME)?.value
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  const decoded = await verifyToken(token)
  const role = decoded?.role ?? ''
  const allowedRoles = ['SUPER_ADMIN', 'MODERATOR', 'REPORTER', 'AD_MANAGER']
  if (!decoded || !allowedRoles.includes(role)) {
    const res = NextResponse.redirect(new URL('/admin/login', req.url))
    res.cookies.set(ADMIN_AUTH_COOKIE_NAME, '', { maxAge: 0, path: '/' })
    return res
  }

  // REPORTER: only /admin (dashboard) and /admin/news/*
  if (role === 'REPORTER') {
    const allowed = pathname === '/admin' || pathname.startsWith('/admin/news')
    if (!allowed) return NextResponse.redirect(new URL('/admin', req.url))
  }

  // AD_MANAGER: only /admin (dashboard) and /admin/ads/*
  if (role === 'AD_MANAGER') {
    const allowed = AD_MANAGER_ALLOWED.some(p => pathname === p || pathname.startsWith(p + '/'))
    if (!allowed) return NextResponse.redirect(new URL('/admin', req.url))
  }

  // Paths restricted to SUPER_ADMIN + MODERATOR
  if (SUPER_MOD_ONLY.some(p => pathname === p || pathname.startsWith(p + '/'))) {
    if (!['SUPER_ADMIN', 'MODERATOR'].includes(role)) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
