"use client"
import {useState,useEffect} from "react"
export default function Home(){
  const [produk,setProduk]=useState([])
  const [q,setQ]=useState("")
  useEffect(()=>{setProduk(JSON.parse(localStorage.getItem("produk")||"[]"))},[])
  const f=produk.filter(p=>p.nama.toLowerCase().includes(q.toLowerCase()))
  return (
    <div style={{minHeight:"100vh",background:"#f8f8f8",fontFamily:"system-ui"}}>
      <header style={{background:"white",borderBottom:"1px solid #eee",padding:"16px 24px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h1 style={{fontWeight:"800",fontSize:20}}>Smart Catalogue Pro</h1>
        <div style={{display:"flex",gap:12}}>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari produk..." style={{padding:"8px 12px",border:"1px solid #ddd",borderRadius:10,width:200}}/>
          <a href="/admin" style={{padding:"8px 16px",background:"black",color:"white",borderRadius:10,textDecoration:"none"}}>Admin</a>
        </div>
      </header>
      <main style={{maxWidth:1100,margin:"0 auto",padding:24}}>
        <h2 style={{fontSize:26,fontWeight:"bold"}}>Katalog - {f.length} Produk</h2>
        <p style={{color:"#666",marginBottom:16}}>{produk.length===0?"Belum ada produk. Klik Tambah di /admin/produk":"Koleksi terbaik"}</p>
        {f.length===0?(
          <div style={{background:"white",border:"1px dashed #ccc",borderRadius:16,padding:48,textAlign:"center"}}>
            <div style={{fontSize:48}}>📦</div><p>Belum ada produk</p>
            <a href="/admin/produk" style={{display:"inline-block",marginTop:12,padding:"10px 20px",background:"black",color:"white",borderRadius:10,textDecoration:"none"}}>Tambah Produk Pertama</a>
          </div>
        ):(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:16}}>
            {f.map(p=>(
              <div key={p.id} style={{background:"white",borderRadius:16,overflow:"hidden",border:"1px solid #eee"}}>
                <div style={{height:160,background:"linear-gradient(135deg,#667eea,#764ba2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:48}}>📦</div>
                <div style={{padding:16}}><div style={{fontWeight:"600"}}>{p.nama}</div><div style={{fontWeight:"bold"}}>Rp{Number(p.harga).toLocaleString("id-ID")}</div></div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
