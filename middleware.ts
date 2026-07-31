import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Izinin halaman login + semua api auth
        if (pathname === "/admin/login") return true
        if (pathname.startsWith("/api/auth")) return true
        
        // Protect semua /admin lain
        if (pathname.startsWith("/admin")) return !!token
        
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/admin/:path*"],
}