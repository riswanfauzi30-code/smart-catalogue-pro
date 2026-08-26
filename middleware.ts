import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // Biarin login lewat
  if (req.nextUrl.pathname.startsWith('/admin/login')) {
    return NextResponse.next()
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
