"use client"
import {useState,useEffect} from "react"
export default function ProdukPage(){
  const [produk,setProduk]=useState([])
  const [kategori,setKategori]=useState([])
  const [satuan,setSatuan]=useState([])
  const [nama,setNama]=useState("")
  const [harga,setHarga]=useState("")
  const [kat,setKat]=useState("")
  const [sat,setSat]=useState("")
  useEffect(()=>{
    setProduk(JSON.parse(localStorage.getItem("produk")||"[]"))
    setKategori(JSON.parse(localStorage.getItem("kategori")||"[]"))
    setSatuan(JSON.parse(localStorage.getItem("satuan")||"[]"))
  },[])
  const tambah=()=>{
    if(!nama)return
    const baru=[...produk,{id:Date.now(),nama,harga,kat,sat}]
    setProduk(baru);localStorage.setItem("produk",JSON.stringify(baru));setNama("");setHarga("")
  }
  const hapus=(id)=>{const b=produk.filter(p=>p.id!==id);setProduk(b);localStorage.setItem("produk",JSON.stringify(b))}
  return (
    <div style={{minHeight:"100vh",background:"#f8f8f8",padding:24,fontFamily:"system-ui"}}>
      <div style={{maxWidth:800,margin:"0 auto"}}>
        <h1 style={{fontSize:24,fontWeight:"800"}}>📦 Kelola Produk - {produk.length} Produk</h1>
        <div style={{background:"white",padding:20,borderRadius:16,border:"1px solid #eee",marginTop:16,display:"grid",gap:12}}>
          <div style={{display:"flex",gap:12}}>
            <input placeholder="Nama produk" value={nama} onChange={e=>setNama(e.target.value)} style={{flex:1,padding:"12px",border:"1px solid #ddd",borderRadius:10}}/>
            <input placeholder="Harga" type="number" value={harga} onChange={e=>setHarga(e.target.value)} style={{width:140,padding:"12px",border:"1px solid #ddd",borderRadius:10}}/>
          </div>
          <div style={{display:"flex",gap:12}}>
            <select value={kat} onChange={e=>setKat(e.target.value)} style={{flex:1,padding:"12px",border:"1px solid #ddd",borderRadius:10}}>
              <option value="">Pilih Kategori</option>
              {kategori.map(k=><option key={k.id} value={k.nama}>{k.nama}</option>)}
            </select>
            <select value={sat} onChange={e=>setSat(e.target.value)} style={{flex:1,padding:"12px",border:"1px solid #ddd",borderRadius:10}}>
              <option value="">Pilih Satuan</option>
              {satuan.map(s=><option key={s.id} value={s.nama}>{s.nama}</option>)}
            </select>
            <button onClick={tambah} style={{padding:"12px 20px",background:"black",color:"white",borderRadius:10,fontWeight:"bold"}}>Tambah</button>
          </div>
        </div>
        <div style={{marginTop:16,display:"grid",gap:10}}>
          {produk.map(p=>(
            <div key={p.id} style={{background:"white",padding:16,borderRadius:12,border:"1px solid #eee",display:"flex",justifyContent:"space-between"}}>
              <div><b>{p.nama}</b> <span style={{fontSize:12,background:"#f5f5f5",padding:"4px 8px",borderRadius:10,marginLeft:6}}>{p.kat} {p.sat&&"• "+p.sat}</span><div style={{color:"#666"}}>Rp{Number(p.harga).toLocaleString("id-ID")}</div></div>
              <button onClick={()=>hapus(p.id)} style={{color:"red",background:"#fff0f0",padding:"8px 12px",borderRadius:8,border:"1px solid #ffd0d0"}}>Hapus</button>
            </div>
          ))}
        </div>
        <a href="/admin" style={{display:"block",marginTop:20,color:"#666",textDecoration:"none"}}>← Kembali Dashboard</a>
      </div>
    </div>
  )
}
