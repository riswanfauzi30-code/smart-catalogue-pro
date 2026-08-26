"use client"
import { useState } from "react"
export default function LoginPage() {
  const [email, setEmail] = useState("admin@example.com")
  const [pass, setPass] = useState("admin123")
  const login = () => {
    if (email === "admin@example.com" && pass === "admin123") {
      localStorage.setItem("isAdmin","true")
      document.cookie="admin-auth=true; path=/; max-age=86400"
      window.location.href="/admin"
    } else {
      alert("Salah! Pake admin@example.com / admin123")
    }
  }
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f5f5f5"}}>
      <div style={{background:"white",padding:"32px",borderRadius:"12px",width:"380px"}}>
        <h1 style={{textAlign:"center",fontWeight:"bold",fontSize:"22px"}}>Admin Login</h1>
        <p style={{textAlign:"center",fontSize:"12px",color:"#888",marginBottom:"16px"}}>Nuclear Mode - No DB</p>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{width:"100%",padding:"10px",border:"1px solid #ccc",borderRadius:"6px",marginBottom:"10px"}} />
        <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password" style={{width:"100%",padding:"10px",border:"1px solid #ccc",borderRadius:"6px",marginBottom:"12px"}} />
        <button onClick={login} style={{width:"100%",padding:"10px",background:"black",color:"white",borderRadius:"6px",fontWeight:"bold"}}>LOGIN</button>
        <p style={{fontSize:"11px",textAlign:"center",marginTop:"10px",color:"#999"}}>admin@example.com / admin123</p>
      </div>
    </div>
  )
}
