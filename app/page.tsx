"use client"
import {useState,useEffect} from "react"
export default function Home(){
  const [produk,setProduk]=useState<any[]>([])
  const [kategori,setKategori]=useState<any[]>([])
  const [q,setQ]=useState("")
  const [kat,setKat]=useState("")
  useEffect(()=>{
    setProduk(JSON.parse(localStorage.getItem("produk")||"[]"))
    setKategori(JSON.parse(localStorage.getItem("kategori")||"[]"))
  },[])
  const filtered=produk.filter(p=>{
    const mQ=p.nama.toLowerCase().includes(q.toLowerCase())
    const mK=kat? p.kat===kat : true
    return mQ && mK
  })
  return (
    <div style={{minHeight:"100vh",background:"#F1F5F8",fontFamily:"system-ui"}}>
      <header style={{background:"#0066AE",color:"white",position:"sticky",top:0,zIndex:20}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"14px 20px",display:"flex",gap:16,alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:38,height:38,background:"white",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"#0066AE",fontWeight:"900",fontSize:14,letterSpacing:-0.5}}>RF</div>
            <div style={{lineHeight:1.1}}><div style={{fontWeight:"900",fontSize:16}}>RF Smart Catalogue</div><div style={{fontSize:10,opacity:0.85}}>BCA Blue #0066AE • Official Palette</div></div>
          </div>
          <div style={{flex:1,maxWidth:600,position:"relative"}}>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari di katalog..." style={{width:"100%",padding:"11px 40px 11px 16px",borderRadius:10,border:"2px solid #2FA6FC",outline:"none"}}/>
            <span style={{position:"absolute",right:14,top:11}}>🔍</span>
          </div>
          <a href="/admin" style={{background:"white",color:"#0066AE",padding:"10px 20px",borderRadius:10,textDecoration:"none",fontWeight:"800"}}>Admin</a>
        </div>
      </header>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"20px"}}>
        <div style={{background:"white",borderRadius:16,padding:20,borderLeft:"6px solid #0066AE"}}>
          <h1 style={{color:"#0066AE",fontWeight:"900"}}>Katalog {filtered.length} Produk - #0066AE Resmi</h1>
          <p style={{color:"#63ACF2",fontSize:13}}>500 #0066AE • 400 #2FA6FC • 300 #63ACF2 • 200 #AAD2F8 • 100 #F1F5F8</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:14,marginTop:16}}>
          {filtered.map((p:any)=>(
            <div key={p.id} style={{background:"white",borderRadius:14,border:"1px solid #AAD2F8",overflow:"hidden"}}>
              <div style={{height:6,background:"#0066AE"}}/>
              <div style={{height:120,background:"#F1F5F8",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36}}>📦</div>
              <div style={{padding:14}}>
                <div style={{fontWeight:"800",color:"#0066AE"}}>{p.nama}</div>
                <div style={{color:"#0066AE",fontWeight:"900",marginTop:8}}>Rp{Number(p.harga).toLocaleString("id-ID")}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
