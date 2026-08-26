import Credentials from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.email === "admin@example.com" && credentials?.password === "admin123") {
          return { id: "1", email: "admin@example.com", name: "Admin" }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: "/admin/login"
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-dev-only-1234567890",
}
