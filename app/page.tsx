"use client"
import {useState,useEffect} from "react"
export default function Home(){
  const [produk,setProduk]=useState<any[]>([])
  const [kategori,setKategori]=useState<any[]>([])
  const [q,setQ]=useState("")
  const [katFilter,setKatFilter]=useState("")
  useEffect(()=>{
    setProduk(JSON.parse(localStorage.getItem("produk")||"[]"))
    setKategori(JSON.parse(localStorage.getItem("kategori")||"[]"))
  },[])
  const filtered=produk.filter(p=>{
    const matchQ=p.nama.toLowerCase().includes(q.toLowerCase())
    const matchKat=katFilter? p.kat===katFilter : true
    return matchQ && matchKat
  })
  return (
    <div style={{minHeight:"100vh",background:"#fff",fontFamily:"Inter,system-ui"}}>
      <header style={{position:"sticky",top:0,zIndex:20,background:"white",borderBottom:"1px solid #e5e7e9"}}>
        <div style={{background:"#03ac0e",height:4}}/>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"12px 16px",display:"flex",gap:12,alignItems:"center"}}>
          <div style={{fontWeight:"900",color:"#03ac0e",fontSize:22,letterSpacing:-0.5}}>tokopedia</div>
          <div style={{flex:1,position:"relative"}}>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari di Tokopedia" style={{width:"100%",padding:"10px 40px 10px 16px",border:"1px solid #e5e7e9",borderRadius:8,outline:"none"}}/>
            <div style={{position:"absolute",right:12,top:10}}>🔍</div>
          </div>
          <a href="/admin" style={{padding:"8px 16px",border:"1px solid #03ac0e",color:"#03ac0e",borderRadius:8,textDecoration:"none",fontWeight:"700",fontSize:13}}>Admin</a>
          <button onClick={()=>{document.cookie="admin=; path=/; max-age=0"; location.href="/admin/login"}} style={{padding:"8px 12px",background:"#f5f5f5",borderRadius:8,border:"none"}}>Logout</button>
        </div>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"8px 16px",display:"flex",gap:8,overflowX:"auto"}}>
          <button onClick={()=>setKatFilter("")} style={{padding:"6px 14px",borderRadius:20,border:katFilter===""?"1px solid #03ac0e":"1px solid #e5e7e9",background:katFilter===""?"#e8f8e9":"white",color:katFilter===""?"#03ac0e":"#666",whiteSpace:"nowrap",fontSize:13,fontWeight:"600"}}>Semua</button>
          {kategori.map((k:any)=><button key={k.id} onClick={()=>setKatFilter(k.nama)} style={{padding:"6px 14px",borderRadius:20,border:katFilter===k.nama?"1px solid #03ac0e":"1px solid #e5e7e9",background:katFilter===k.nama?"#e8f8e9":"white",color:katFilter===k.nama?"#03ac0e":"#666",whiteSpace:"nowrap",fontSize:13}}>{k.nama}</button>)}
          <a href="/admin/kategori" style={{padding:"6px 14px",borderRadius:20,border:"1px dashed #ccc",color:"#999",textDecoration:"none",fontSize:13,whiteSpace:"nowrap"}}>+ Kategori</a>
        </div>
      </header>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"16px"}}>
        <div style={{background:"linear-gradient(90deg,#03ac0e,#00d2ff)",borderRadius:12,padding:20,color:"white",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{fontWeight:"800",fontSize:18}}>Smart Catalogue Pro</div><div style={{fontSize:13,opacity:0.9}}>Belanja kebutuhan supplies lebih mudah • {produk.length} produk tersedia</div></div>
          <div style={{background:"white",color:"#03ac0e",padding:"8px 16px",borderRadius:8,fontWeight:"800",fontSize:13}}>{filtered.length} Produk</div>
        </div>
        <div style={{marginTop:20}}>
          <h2 style={{fontWeight:"800",fontSize:16,marginBottom:12}}>Untuk Kamu • <span style={{color:"#03ac0e"}}>{filtered.length} produk</span></h2>
          {filtered.length===0?(
            <div style={{textAlign:"center",padding:40,border:"1px dashed #ddd",borderRadius:12}}><div style={{fontSize:48}}>🛒</div><p>Produk tidak ditemukan</p><a href="/admin/produk" style={{display:"inline-block",marginTop:10,padding:"10px 20px",background:"#03ac0e",color:"white",borderRadius:8,textDecoration:"none",fontWeight:"700"}}>Tambah Produk</a></div>
          ):(
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:12}}>
              {filtered.map((p:any)=>(
                <div key={p.id} style={{border:"1px solid #e5e7e9",borderRadius:8,overflow:"hidden",background:"white"}}>
                  <div style={{height:150,background:"#f9f9f9",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
                    <div style={{fontSize:40}}>📦</div>
                    <div style={{position:"absolute",top:8,left:8,background:"rgba(0,0,0,0.05)",padding:"2px 6px",borderRadius:4,fontSize:10}}>{p.kat||"Umum"}</div>
                  </div>
                  <div style={{padding:10}}>
                    <div style={{fontSize:13,lineHeight:"1.3",height:34,overflow:"hidden"}}>{p.nama}</div>
                    <div style={{fontWeight:"800",color:"#ff6900",marginTop:6,fontSize:14}}>Rp{Number(p.harga).toLocaleString("id-ID")}</div>
                    <div style={{fontSize:11,color:"#666",marginTop:2}}>{p.sat? `per ${p.sat}`:""} • {p.kat}</div>
                    <div style={{display:"flex",alignItems:"center",gap:4,marginTop:6}}><span style={{color:"#ffc400",fontSize:11}}>★★★★★</span><span style={{fontSize:11,color:"#999"}}>500+ terjual</span></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
