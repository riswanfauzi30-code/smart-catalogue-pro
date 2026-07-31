const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
async function main() {
  const del = await prisma.product.deleteMany({})
  console.log(`KEHAPUS: ${del.count} produk`)
}
main()
