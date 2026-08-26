"use client"
import { useState } from "react"
export default function Login(){
  const [email,setEmail]=useState("admin@example.com")
  const [pass,setPass]=useState("admin123")
  const submit=(e:any)=>{
    e.preventDefault()
    if(email==="admin@example.com" && pass==="admin123"){
      localStorage.setItem("isAdmin","true")
      document.cookie="admin-auth=true; path=/; max-age=86400"
      window.location.href="/admin"
    } else {
      alert("Email atau password salah")
    }
  }
  return(
    <div style={{display:"flex",justifyContent:"center",paddingTop:80}}>
      <form onSubmit={submit} style={{width:360,border:"1px solid #ddd",padding:24,borderRadius:12}}>
        <h1>Admin Login</h1>
        <p>Nuclear Mode - No DB - fb5c42d FIX</p>
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} style={{width:"100%",padding:8,margin:"8px 0"}}/>
        <label>Password</label>
        <input type="password" value={pass} onChange={e=>setPass(e.target.value)} style={{width:"100%",padding:8,margin:"8px 0"}}/>
        <button type="submit" style={{width:"100%",padding:10,marginTop:16,background:"black",color:"white",borderRadius:8}}>LOGIN</button>
      </form>
    </div>
  )
}
