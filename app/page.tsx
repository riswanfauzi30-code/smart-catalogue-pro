"use client"
import {useState,useEffect} from "react"
export default function Home(){
  const [produk,setProduk]=useState<any[]>([])
  const [q,setQ]=useState("")
  useEffect(()=>{ setProduk(JSON.parse(localStorage.getItem("produk")||"[]")) },[])
  const filtered=produk.filter(p=>p.nama.toLowerCase().includes(q.toLowerCase()))
  return (
    <>
    <style>{`@media(max-width:600px){.hdr{flex-direction:column!important;align-items:stretch!important}.search{max-width:100%!important}.grid{grid-template-columns:repeat(2,1fr)!important;gap:10px!important} .wrap{padding:12px!important}}`}</style>
    <div style={{minHeight:"100vh",background:"#F1F5F8",fontFamily:"system-ui"}}>
      <header style={{background:"#0066AE",color:"white",position:"sticky",top:0,zIndex:20}}>
        <div className="hdr" style={{maxWidth:1200,margin:"0 auto",padding:"12px 16px",display:"flex",gap:12,alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:36,height:36,background:"white",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"#0066AE",fontWeight:"900"}}>RF</div>
              <div style={{fontWeight:"900",fontSize:15}}>RF Smart Catalogue</div>
            </div>
            <a href="/admin" style={{background:"white",color:"#0066AE",padding:"8px 14px",borderRadius:10,textDecoration:"none",fontWeight:"800",fontSize:13,display:"inline-block"}}>Admin</a>
          </div>
          <div className="search" style={{flex:1,maxWidth:600,position:"relative"}}>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari di katalog..." style={{width:"100%",padding:"11px 40px 11px 14px",borderRadius:10,border:"2px solid #2FA6FC",outline:"none",fontSize:14}}/>
            <span style={{position:"absolute",right:12,top:10}}>🔍</span>
          </div>
        </div>
      </header>
      <div className="wrap" style={{maxWidth:1200,margin:"0 auto",padding:"20px"}}>
        <div style={{background:"white",borderRadius:14,padding:14,borderLeft:"5px solid #0066AE"}}>
          <h1 style={{color:"#0066AE",fontWeight:"900",fontSize:16,margin:0}}>Katalog {filtered.length} Produk</h1>
        </div>
        <div className="grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:14,marginTop:14}}>
          {filtered.map((p:any)=>(
            <div key={p.id} style={{background:"white",borderRadius:12,border:"1px solid #AAD2F8",overflow:"hidden"}}>
              <div style={{height:5,background:"#0066AE"}}/>
              <div style={{height:90,background:"#F1F5F8",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>📦</div>
              <div style={{padding:10}}>
                <div style={{fontWeight:"800",color:"#0066AE",fontSize:13,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.nama}</div>
                <div style={{color:"#0066AE",fontWeight:"900",marginTop:6,fontSize:13}}>Rp{Number(p.harga).toLocaleString("id-ID")}</div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length===0 && <div style={{textAlign:"center",padding:40,color:"#63ACF2"}}>Belum ada produk di InPrivate - buka di browser biasa produk lama masih ada</div>}
      </div>
    </div>
    </>
  )
}
