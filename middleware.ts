import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check for admin routes
  if (request.nextUrl.pathname.startsWith('/admin-dashboard')) {
    const sessionCookie = request.cookies.get('ahlan_admin_session');
    
    // If no secure session cookie, redirect to homepage
    if (!sessionCookie || sessionCookie.value !== 'true') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin-dashboard/:path*'],
};
