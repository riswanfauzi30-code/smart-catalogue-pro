"use client"
import {useState,useEffect} from "react"
export default function Home(){
  const [produk,setProduk]=useState([])
  const [q,setQ]=useState("")
  useEffect(()=>{setProduk(JSON.parse(localStorage.getItem("produk")||"[]"))},[])
  const filtered=produk.filter(p=>p.nama.toLowerCase().includes(q.toLowerCase()))
  return (
    <div style={{minHeight:"100vh",background:"#f8f8f8",fontFamily:"system-ui"}}>
      <header style={{background:"white",borderBottom:"1px solid #eee",padding:"16px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0}}>
        <h1 style={{fontWeight:"800",fontSize:20}}>Smart Catalogue Pro</h1>
        <div style={{display:"flex",gap:12}}>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari produk..." style={{padding:"8px 12px",border:"1px solid #ddd",borderRadius:8,width:200}}/>
          <a href="/admin" style={{padding:"8px 16px",background:"black",color:"white",borderRadius:8,textDecoration:"none"}}>Admin</a>
        </div>
      </header>
      <main style={{maxWidth:1100,margin:"0 auto",padding:24}}>
        <div style={{marginBottom:24}}>
          <h2 style={{fontSize:28,fontWeight:"bold"}}>Katalog - {filtered.length} Produk</h2>
          <p style={{color:"#666"}}>{produk.length===0?"Belum ada produk. Masuk ke /admin untuk tambah.":"Koleksi terbaik pilihan kamu"}</p>
        </div>
        {filtered.length===0?(
          <div style={{background:"white",border:"1px dashed #ccc",borderRadius:16,padding:48,textAlign:"center"}}>
            <p style={{fontSize:48}}>📦</p><p>Belum ada produk</p><a href="/admin/produk" style={{display:"inline-block",marginTop:12,padding:"10px 20px",background:"black",color:"white",borderRadius:8,textDecoration:"none"}}>Tambah Produk Pertama</a>
          </div>
        ):(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:16}}>
            {filtered.map(p=>(
              <div key={p.id} style={{background:"white",borderRadius:16,overflow:"hidden",border:"1px solid #eee"}}>
                <div style={{height:160,background:"linear-gradient(135deg,#667eea 0%,#764ba2 100%)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:48}}>📦</div>
                <div style={{padding:16}}>
                  <h3 style={{fontWeight:"600",marginBottom:4}}>{p.nama}</h3>
                  <p style={{fontWeight:"bold"}}>Rp{Number(p.harga).toLocaleString("id-ID")}</p>
                  <button style={{marginTop:12,width:"100%",padding:8,background:"#f5f5f5",border:"1px solid #eee",borderRadius:8}}>Lihat Detail</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
