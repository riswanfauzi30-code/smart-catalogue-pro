"use client"
import {useState,useEffect} from "react"
export default function SatuanPage(){
  const [satuan,setSatuan]=useState<any[]>([])
  const [nama,setNama]=useState("")
  useEffect(()=>{setSatuan(JSON.parse(localStorage.getItem("satuan")||"[]"))},[])
  const tambah=()=>{ if(!nama)return; const b=[...satuan,{id:Date.now(),nama}]; setSatuan(b); localStorage.setItem("satuan",JSON.stringify(b)); setNama("")}
  const hapus=(id:any)=>{const b=satuan.filter((s:any)=>s.id!==id);setSatuan(b);localStorage.setItem("satuan",JSON.stringify(b))}
  return (
    <div style={{minHeight:"100vh",background:"#f5f5f5",padding:24,fontFamily:"system-ui"}}>
      <div style={{maxWidth:900,margin:"0 auto"}}>
        <div style={{background:"white",padding:16,borderRadius:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h1 style={{fontWeight:"800"}}>📏 Kelola Satuan - {satuan.length}</h1><a href="/admin" style={{color:"#03ac0e",textDecoration:"none",fontWeight:"bold"}}>← Dashboard</a>
        </div>
        <div style={{background:"white",padding:20,borderRadius:12,marginTop:16,display:"flex",gap:12}}>
          <input placeholder="Pcs, Pack, Dus, Kg, Rim, Lusin" value={nama} onChange={e=>setNama(e.target.value)} style={{flex:1,padding:"12px",border:"1px solid #ddd",borderRadius:8}}/>
          <button onClick={tambah} style={{padding:"12px 24px",background:"#03ac0e",color:"white",borderRadius:8,fontWeight:"bold",border:"none"}}>Tambah</button>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:12,marginTop:16}}>
          {satuan.map((s:any)=><div key={s.id} style={{background:"white",padding:"10px 16px",borderRadius:20,boxShadow:"0 1px 2px rgba(0,0,0,0.1)",display:"flex",gap:8}}>{s.nama}<button onClick={()=>hapus(s.id)} style={{color:"red",border:"none",background:"none",cursor:"pointer"}}>✕</button></div>)}
        </div>
      </div>
    </div>
  )
}
