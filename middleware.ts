import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
export function middleware(req: NextRequest){
  const isLogged = req.cookies.get("admin")?.value === "1"
  const isLoginPage = req.nextUrl.pathname.startsWith("/admin/login")
  const isPublicAsset = req.nextUrl.pathname.startsWith("/_next") || req.nextUrl.pathname.includes(".")
  if(isPublicAsset) return NextResponse.next()
  if(!isLogged && !isLoginPage){
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }
  if(isLogged && isLoginPage){
    return NextResponse.redirect(new URL("/", req.url))
  }
  return NextResponse.next()
}
export const config = { matcher: ["/((?!api).*)"] }
