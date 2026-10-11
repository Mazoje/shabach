import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect all routes starting with /admin (excluding /admin/login)
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const sessionCookie = request.cookies.get('shabach_admin_session');

    if (!sessionCookie || sessionCookie.value !== 'authenticated_true') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};