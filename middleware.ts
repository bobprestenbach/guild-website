import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isDashboard = req.nextUrl.pathname.startsWith('/dashboard')

  if (isDashboard && !isLoggedIn) {
    const url = new URL('/signin', req.nextUrl.origin)
    url.searchParams.set('callbackUrl', req.nextUrl.href)
    return NextResponse.redirect(url)
  }
})

export const config = {
  matcher: ['/dashboard/:path*'],
}
