import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function AdminDashboard() {
  const totalProduk = await prisma.product.count()
  const totalStokAgg = await prisma.product.aggregate({ _sum: { stock: true } })
  const totalStok = totalStokAgg._sum.stock || 0
  const kategori = await prisma.product.groupBy({ by: ['category'], _count: true })
  const totalKategori = kategori.length

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Kelola katalog produk Anda</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/import" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
            📥 Import Excel
          </Link>
          <Link href="/admin/import" className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-sm">
            📊 Import Google Sheets
          </Link>
          <Link href="/admin/products/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
            + Tambah Produk
          </Link>
          <Link href="/admin/login" className="border px-4 py-2 rounded-lg text-sm">
            Logout
          </Link>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-gray-500">Total Produk</p>
          <p className="text-3xl font-bold mt-2">{totalProduk}</p>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-gray-500">Total Stok</p>
          <p className="text-3xl font-bold mt-2">{totalStok}</p>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-gray-500">Kategori</p>
          <p className="text-3xl font-bold mt-2">{totalKategori}</p>
        </div>
      </div>
    </div>
  )
}