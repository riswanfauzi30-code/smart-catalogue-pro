import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

export async function GET() {
  const prisma = new PrismaClient()
  try {
    const hash = await bcrypt.hash('admin123', 10)
    const user = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: { password: hash },
      create: { email: 'admin@example.com', name: 'Admin', password: hash }
    })
    const check = await bcrypt.compare('admin123', user.password)
    return Response.json({ success: true, email: user.email, hashCheck: check, hash: hash.substring(0,20)+'...' })
  } catch (e: any) {
    return Response.json({ success: false, error: e.message }, { status: 500 })
  }
}