import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@example.com";
  const password = process.env.ADMIN_PASSWORD ?? "admin123";
  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
      name: "Admin",
    },
  });

  const sampleProducts = [
    {
      nama: "Wireless Headphone Pro",
      harga: 899000,
      deskripsi:
        "Headphone nirkabel dengan noise cancelling dan baterai tahan 30 jam.",
      stok: 25,
      kategori: "Elektronik",
      gambar_url:
        "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    },
    {
      nama: "Kaos Premium Cotton",
      harga: 149000,
      deskripsi: "Kaos katun combed 30s, nyaman dipakai sehari-hari.",
      stok: 50,
      kategori: "Fashion",
      gambar_url:
        "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    },
    {
      nama: "Kopi Arabica Specialty",
      harga: 85000,
      deskripsi: "Biji kopi arabica single origin dari dataran tinggi.",
      stok: 100,
      kategori: "Makanan & Minuman",
      gambar_url:
        "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    },
    {
      nama: "Matras Yoga Premium",
      harga: 299000,
      deskripsi: "Matras yoga anti-slip dengan ketebalan 6mm.",
      stok: 30,
      kategori: "Olahraga",
      gambar_url:
        "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    },
    {
      nama: "Botol Minum Stainless",
      harga: 129000,
      deskripsi: "Botol minum stainless steel 750ml, tahan panas & dingin.",
      stok: 45,
      kategori: "Rumah Tangga",
      gambar_url:
        "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    },
    {
      nama: "Vitamin C 1000mg",
      harga: 99000,
      deskripsi: "Suplemen vitamin C untuk daya tahan tubuh, isi 60 kapsul.",
      stok: 80,
      kategori: "Kesehatan",
      gambar_url:
        "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    },
  ];

  for (const product of sampleProducts) {
    const existing = await prisma.product.findFirst({
      where: { nama: product.nama },
    });
    if (!existing) {
      await prisma.product.create({ data: product });
    }
  }

  console.log("Seed completed!");
  console.log(`Admin email: ${email}`);
  console.log(`Admin password: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
