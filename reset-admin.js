const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  const hash = await bcrypt.hash('admin123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: { password: hash, name: 'Admin' },
    create: { email: 'admin@example.com', name: 'Admin', password: hash },
  })
  console.log('SUCCESS email:', user.email)
  const ok = await bcrypt.compare('admin123', user.password)
  console.log('Password admin123 cocok?', ok)
}
main().finally(()=>prisma.$disconnect())