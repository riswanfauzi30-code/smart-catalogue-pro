import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs' //

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('admin123', 12) // 
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: { password },
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      password,
    }
  })
  
  console.log(`Admin created: ${admin.email} / admin123`)
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())