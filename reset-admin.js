const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
async function main(){
  const prisma = new PrismaClient()
  const user = await prisma.user.findUnique({ where: { email: 'admin@example.com' } })
  if(!user){ console.log('USER TIDAK ADA!'); return }
  console.log('Email:', user.email)
  console.log('Hash di DB:', user.password.substring(0,20)+'...')
  const ok = await bcrypt.compare('admin123', user.password)
  console.log('Password admin123 cocok?', ok)
  await prisma.$disconnect()
}
main()