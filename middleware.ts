// app/proxy.ts (or root proxy.ts)

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only protect /admin routes (but allow API endpoints and the login page)
  if (pathname.startsWith('/admin')) {
    // Allow the login page and assets
    if (pathname === '/admin/login' || pathname.startsWith('/api')) {
      return NextResponse.next()
    }

    const cookie = req.cookies.get('admin_token')?.value
    if (!cookie) {
      const url = req.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

// Apply to /admin paths only
export const config = {
  matcher: ['/admin/:path*'],
}
