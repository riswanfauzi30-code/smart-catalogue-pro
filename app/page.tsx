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
    <div style={{minHeight:"100vh",background:"#f0f6ff",fontFamily:"system-ui"}}>
      <header style={{background:"linear-gradient(90deg,#003d79,#0060af)",color:"white",position:"sticky",top:0,zIndex:20,boxShadow:"0 2px 12px rgba(0,61,121,0.3)"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"14px 20px",display:"flex",gap:16,alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:32,height:32,background:"white",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"#0060af",fontWeight:"900"}}>S</div>
            <div><div style={{fontWeight:"900",fontSize:18,lineHeight:1}}>Smart Catalogue</div><div style={{fontSize:10,opacity:0.8,letterSpacing:1}}>BCA STYLE • PRO</div></div>
          </div>
          <div style={{flex:1,maxWidth:600,position:"relative"}}>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari produk supplies..." style={{width:"100%",padding:"11px 40px 11px 16px",borderRadius:10,border:"none",outline:"none",background:"white",color:"#003d79"}}/>
            <span style={{position:"absolute",right:14,top:11}}>🔍</span>
          </div>
          <a href="/admin" style={{background:"white",color:"#0060af",padding:"9px 18px",borderRadius:10,textDecoration:"none",fontWeight:"800",fontSize:13}}>Admin</a>
          <button onClick={()=>{document.cookie="admin=; path=/; max-age=0"; location.href="/admin/login"}} style={{background:"rgba(255,255,255,0.2)",color:"white",border:"1px solid rgba(255,255,255,0.3)",padding:"9px 14px",borderRadius:10,cursor:"pointer"}}>Logout</button>
        </div>
        <div style={{background:"rgba(255,255,255,0.1)",backdropFilter:"blur(10px)"}}>
          <div style={{maxWidth:1200,margin:"0 auto",padding:"10px 20px",display:"flex",gap:8,overflowX:"auto"}}>
            <button onClick={()=>setKat("")} style={{padding:"6px 16px",borderRadius:20,border:"none",background:kat===""?"white":"rgba(255,255,255,0.2)",color:kat===""?"#0060af":"white",fontWeight:"700",fontSize:13,whiteSpace:"nowrap"}}>Semua Produk</button>
            {kategori.map((k:any)=><button key={k.id} onClick={()=>setKat(k.nama)} style={{padding:"6px 16px",borderRadius:20,border:"none",background:kat===k.nama?"white":"rgba(255,255,255,0.2)",color:kat===k.nama?"#0060af":"white",fontSize:13,whiteSpace:"nowrap"}}>{k.nama}</button>)}
          </div>
        </div>
      </header>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"20px"}}>
        <div style={{background:"white",borderRadius:16,padding:20,display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"0 4px 20px rgba(0,96,175,0.08)",border:"1px solid #d6e6ff"}}>
          <div><h1 style={{fontSize:20,fontWeight:"900",color:"#003d79"}}>Katalog Supplies • {filtered.length} Produk</h1><p style={{color:"#6b8ab0",fontSize:13,marginTop:4}}>Background biru BCA + putih bersih • Update terbaru {new Date().toLocaleDateString("id-ID")}</p></div>
          <div style={{background:"#0060af",color:"white",padding:"10px 18px",borderRadius:10,fontWeight:"800"}}>{produk.length} Item</div>
        </div>

        {filtered.length===0?(
          <div style={{background:"white",borderRadius:16,padding:60,textAlign:"center",marginTop:16,border:"1px solid #d6e6ff"}}><div style={{fontSize:50}}>📦</div><p style={{color:"#6b8ab0",marginTop:8}}>Belum ada produk</p><a href="/admin/produk" style={{display:"inline-block",marginTop:12,padding:"12px 24px",background:"#0060af",color:"white",borderRadius:10,textDecoration:"none",fontWeight:"700"}}>+ Tambah Produk Pertama</a></div>
        ):(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:14,marginTop:16}}>
            {filtered.map((p:any)=>(
              <div key={p.id} style={{background:"white",borderRadius:14,overflow:"hidden",border:"1px solid #d6e6ff",boxShadow:"0 2px 10px rgba(0,96,175,0.06)"}}>
                <div style={{height:8,background:"linear-gradient(90deg,#003d79,#0060af)"}}/>
                <div style={{height:130,background:"#f7fbff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36}}>📦</div>
                <div style={{padding:14}}>
                  <div style={{fontSize:13,fontWeight:"700",color:"#003d79",height:36,overflow:"hidden"}}>{p.nama}</div>
                  <div style={{fontSize:11,color:"#6b8ab0",marginTop:4}}>{p.kat||"SUPPLIES"} {p.sat? `• ${p.sat}`:""}</div>
                  <div style={{marginTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{fontWeight:"900",color:"#0060af",fontSize:15}}>Rp{Number(p.harga).toLocaleString("id-ID")}</div>
                    <div style={{fontSize:10,background:"#e8f1ff",color:"#0060af",padding:"4px 8px",borderRadius:20,fontWeight:"700"}}>{p.sat||"Pcs"}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
