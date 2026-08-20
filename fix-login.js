const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
async function main(){
  const prisma = new PrismaClient()
  console.log('Hapus semua user...')
  await prisma.user.deleteMany({})
  const hash = await bcrypt.hash('admin123', 10)
  const user = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin',
      password: hash,
    }
  })
  console.log('BUAT BARU SUKSES:', user.email)
  console.log('Password: admin123')
  console.log('Hash:', hash)
  await prisma.$disconnect()
}
main()