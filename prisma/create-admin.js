const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash('admin123', 10);
  
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: { password: hashed },
    create: {
      email: 'admin@example.com',
      password: hashed,
      name: 'Admin'
    }
  });
  console.log('ADMIN CREATED: admin@example.com / admin123');
}

main();