import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

const protectedPages = ['/card', '/dashboard'];
const publicPages = ['/', '/login'];
export const middleware = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  if (
    pathname.startsWith('/_next') || // JS, CSS, static assets
    pathname.startsWith('/api') || // API routes
    pathname.startsWith('/favicon') || // Favicon
    pathname.startsWith('/images') // Your image path (optional)
  ) {
    return NextResponse.next();
  }
  const isProtectedRoute = protectedPages.includes(pathname);
  const isPublicRoute = publicPages.includes(pathname);
  if (isPublicRoute) {
    return NextResponse.next();
  }
  const session = await getSession();
  if (!session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }
};
