"use client"
import {useState,useEffect} from "react"
export default function KategoriPage(){
  const [kategori,setKategori]=useState([])
  const [nama,setNama]=useState("")
  useEffect(()=>{setKategori(JSON.parse(localStorage.getItem("kategori")||"[]"))},[])
  const tambah=()=>{
    if(!nama)return
    const b=[...kategori,{id:Date.now(),nama}]
    setKategori(b);localStorage.setItem("kategori",JSON.stringify(b));setNama("")
  }
  return (
    <div style={{minHeight:"100vh",background:"#f8f8f8",padding:24,fontFamily:"system-ui"}}>
      <div style={{maxWidth:800,margin:"0 auto"}}>
        <h1 style={{fontSize:24,fontWeight:"800"}}>📁 Kelola Kategori - {kategori.length}</h1>
        <div style={{background:"white",padding:20,borderRadius:16,border:"1px solid #eee",display:"flex",gap:12,marginTop:16}}>
          <input placeholder="Nama kategori" value={nama} onChange={e=>setNama(e.target.value)} style={{flex:1,padding:"12px",border:"1px solid #ddd",borderRadius:10}}/>
          <button onClick={tambah} style={{padding:"12px 20px",background:"black",color:"white",borderRadius:10,fontWeight:"bold"}}>Tambah</button>
        </div>
        <div style={{marginTop:16,display:"flex",flexWrap:"wrap",gap:10}}>
          {kategori.map(k=>(
            <div key={k.id} style={{background:"white",padding:"10px 16px",borderRadius:20,border:"1px solid #eee"}}>{k.nama}</div>
          ))}
        </div>
        <a href="/admin" style={{display:"block",marginTop:20,color:"#666",textDecoration:"none"}}>← Kembali Dashboard</a>
      </div>
    </div>
  )
}
