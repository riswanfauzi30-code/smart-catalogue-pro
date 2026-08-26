import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import * as XLSX from "xlsx"
export async function POST(req: Request) {
 try {
  const form = await req.formData()
  const file = form.get("file") as File
  if(!file) return NextResponse.json({error:"No file"},{status:400})
  const buf = await file.arrayBuffer()
  const wb = XLSX.read(buf)
  const sheet = wb.Sheets[wb.SheetNames[0]]
  const rows:any[] = XLSX.utils.sheet_to_json(sheet, {defval:""})
  await prisma.product.deleteMany({})
  let count=0
  for(const r of rows){
   const findVal = (cari:string[]) => {
     const key = Object.keys(r).find(k => cari.some(c => k.toLowerCase().includes(c)))
     return key? r[key] : ""
   }
   const nama = findVal(["nama barang","nama komoditas","komoditas","uraian","nama bahan","barang","name"]) || ""
   const hargaRaw = findVal(["harga beli","harga jual","harga","price"])
   const kategori = findVal(["kategori","kelompok","jenis"]) || "Pangan"
   if(!nama) continue
   if(String(nama).length < 3) continue
   if(!isNaN(Number(nama))) continue
   const harga = Number(String(hargaRaw).replace(/[^0-9]/g,"")) || 0
   await prisma.product.create({data:{nama: String(nama).slice(0,100),harga: harga,stok: 10,kategori: String(kategori).slice(0,50),deskripsi: ""}})
   count++
  }
  return NextResponse.json({ok:true,count})
 } catch(e:any){ return NextResponse.json({error:e.message},{status:500}) }
}
