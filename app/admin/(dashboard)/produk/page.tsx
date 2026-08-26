"use client"
import {useState,useEffect} from "react"
export default function ProdukPage(){
  const [produk,setProduk]=useState([])
  const [nama,setNama]=useState("")
  const [harga,setHarga]=useState("")
  useEffect(()=>{setProduk(JSON.parse(localStorage.getItem("produk")||"[]"))},[])
  const tambah=()=>{
    if(!nama)return
    const baru=[...produk,{id:Date.now(),nama,harga}]
    setProduk(baru);localStorage.setItem("produk",JSON.stringify(baru));setNama("");setHarga("")
  }
  const hapus=(id)=>{
    const baru=produk.filter(p=>p.id!==id)
    setProduk(baru);localStorage.setItem("produk",JSON.stringify(baru))
  }
  return <div style={{padding:24}}>
    <h1>📦 Kelola Produk - {produk.length} Produk</h1>
    <div style={{margin:"16px 0",display:"flex",gap:8}}>
      <input placeholder="Nama produk" value={nama} onChange={e=>setNama(e.target.value)} style={{padding:8,border:"1px solid #ccc"}}/>
      <input placeholder="Harga" value={harga} onChange={e=>setHarga(e.target.value)} style={{padding:8,border:"1px solid #ccc"}}/>
      <button onClick={tambah} style={{padding:"8px 16px",background:"black",color:"white"}}>Tambah</button>
    </div>
    <a href="/admin">← Kembali Dashboard</a>
    <div style={{marginTop:16}}>
      {produk.map(p=><div key={p.id} style={{padding:12,border:"1px solid #eee",marginBottom:8,display:"flex",justifyContent:"space-between"}}><span>{p.nama} - Rp{p.harga}</span><button onClick={()=>hapus(p.id)} style={{color:"red"}}>Hapus</button></div>)}
    </div>
  </div>
}
