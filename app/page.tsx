export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function Page(){
  let products: any[] = []
  try {
    products = await prisma.product.findMany({orderBy:{nama:"asc"}})
  } catch(e){
    console.error("PRISMA ERROR:", e)
    products = []
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Katalog - {products.length} Produk</h1>
        <Link href="/admin" className="bg-blue-600 text-white px-4 py-2 rounded">Ke Admin</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((p:any)=>(
          <div key={p.id} className="border rounded-xl p-4 shadow-sm">
            <div className="font-bold text-sm h-12 overflow-hidden">{p.nama}</div>
            <div className="text-xs bg-gray-100 inline-block px-2 py-1 rounded mt-2">{p.kategori}</div>
            <div className="font-bold text-blue-600 mt-3">Rp {Number(p.harga).toLocaleString("id-ID")}</div>
          </div>
        ))}
      </div>
      {products.length === 0 && (
        <div className="text-center mt-20 text-gray-500">Belum ada produk. Masuk ke /admin untuk tambah.</div>
      )}
    </div>
  )
}