"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export async function deleteProduct(id: string) {
  const product = await prisma.product.findUnique({ where: { id } })
  
  await prisma.product.delete({
    where: { id }
  })
  
  revalidatePath("/admin/products")
  return { success: true, message: `Produk "${product?.nama}" berhasil dihapus` }
}

export async function updateProduct(id: string, formData: FormData) {
  const nama = formData.get("nama") as string
  const harga = Number(formData.get("harga"))
  const stok = Number(formData.get("stok"))
  const kategori = formData.get("kategori") as string
  const sku = formData.get("sku") as string

  await prisma.product.update({
    where: { id },
    data: { nama, harga, stok, kategori, sku }
  })

  revalidatePath("/admin/products")
  redirect("/admin/products")
}