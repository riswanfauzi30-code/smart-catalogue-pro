"use client"
import {useState} from "react"
import {useRouter} from "next/navigation"
export default function Login(){
  const [u,setU]=useState(""); const [p,setP]=useState(""); const [err,setErr]=useState("")
  const r=useRouter()
  const login=()=>{
    if(u==="admin" && p==="admin123"){document.cookie="admin=1; path=/; max-age=86400"; r.push("/")} else setErr("Username / password salah! (admin / admin123)")
  }
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f8f8f8",fontFamily:"system-ui"}}>
      <div style={{background:"white",padding:32,borderRadius:20,border:"1px solid #eee",width:380,boxShadow:"0 4px 20px rgba(0,0,0,0.05)"}}>
        <h1 style={{fontSize:24,fontWeight:"800",marginBottom:4}}>Smart Catalogue Pro</h1>
        <p style={{color:"#666",marginBottom:24}}>Login untuk lihat katalog</p>
        <input placeholder="Username" value={u} onChange={e=>setU(e.target.value)} style={{width:"100%",padding:"12px",border:"1px solid #ddd",borderRadius:10,marginBottom:12}}/>
        <input placeholder="Password" type="password" value={p} onChange={e=>setP(e.target.value)} style={{width:"100%",padding:"12px",border:"1px solid #ddd",borderRadius:10,marginBottom:16}}/>
        {err&&<p style={{color:"red",fontSize:13,marginBottom:12}}>{err}</p>}
        <button onClick={login} style={{width:"100%",padding:"12px",background:"black",color:"white",borderRadius:10,fontWeight:"bold"}}>Masuk Katalog</button>
        <p style={{fontSize:12,color:"#999",marginTop:12,textAlign:"center"}}>Demo: admin / admin123</p>
      </div>
    </div>
  )
}
