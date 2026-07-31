const { PrismaClient } = require('@prisma/client');
(async()=>{
 const prisma = new PrismaClient();
 const products = await prisma.product.findMany();
 for(const p of products){
   if(p.harga>0 && p.harga<1000){
     await prisma.product.update({where:{id:p.id}, data:{harga:p.harga*1000}})
   }
 }
 console.log('Harga fixed!');
 await prisma.$disconnect();
})()
