import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
export function middleware(req: NextRequest){
  const isLogged = req.cookies.get("admin")?.value === "1"
  const isLogin = req.nextUrl.pathname.startsWith("/admin/login")
  const isAsset = req.nextUrl.pathname.startsWith("/_next") || req.nextUrl.pathname.startsWith("/favicon") || req.nextUrl.pathname.match(/\.(png|jpg|svg|ico|css|js)$/)
  if(isAsset) return NextResponse.next()
  if(!isLogged && !isLogin){ return NextResponse.redirect(new URL("/admin/login", req.url)) }
  if(isLogged && isLogin){ return NextResponse.redirect(new URL("/", req.url)) }
  return NextResponse.next()
}
export const config = { matcher: ["/((?!api).*)"] }
