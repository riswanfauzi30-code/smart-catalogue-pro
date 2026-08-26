import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { url } = await req.json()
    const csvUrl = url.replace("/edit", "/export?format=csv")
    const text = await (await fetch(csvUrl)).text()
    const lines = text.split("\n").slice(1)
    let count = 0
    for (const l of lines) {
      const [nama, harga, stok, kategori] = l.split(",")
      if (!nama) continue
      await prisma.product.create({
        data: {
          nama: nama.replace(/"/g,"").trim(),
          harga: Number(harga)||0,
          stok: Number(stok)||0,
          kategori: kategori?.replace(/"/g,"")||"Umum",
          deskripsi: ""
        }
      })
      count++
    }
    return NextResponse.json({ count })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}