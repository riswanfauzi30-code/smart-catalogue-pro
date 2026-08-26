"use client"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("admin@example.com")
  const [pass, setPass] = useState("admin123")
  
  const handleLogin = () => {
    if (email === "admin@example.com" && pass === "admin123") {
      localStorage.setItem("isAdmin", "true")
      document.cookie = "admin-auth=true; path=/"
      window.location.href = "/admin"
    } else {
      alert("Email atau password salah bro! Pake admin@example.com / admin123")
    }
  }

  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f5f5f5"}}>
      <div style={{background:"white",padding:32,borderRadius:12,width:380,boxShadow:"0 4px 20px rgba(0,0,0,0.1)"}}>
        <h1 style={{fontSize:24,fontWeight:"bold",marginBottom:8,textAlign:"center"}}>Admin Login</h1>
        <p style={{textAlign:"center",color:"#666",marginBottom:20,fontSize:14}}>Nuclear Mode - No DB Needed</p>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{width:"100%",padding:12,marginBottom:12,border:"1px solid #ddd",borderRadius:8}} />
        <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password" style={{width:"100%",padding:12,marginBottom:16,border:"1px solid #ddd",borderRadius:8}} />
        <button onClick={handleLogin} style={{width:"100%",padding:12,background:"black",color:"white",borderRadius:8,fontWeight:"bold",cursor:"pointer"}}>LOGIN</button>
        <div style={{marginTop:12,fontSize:12,color:"#888",textAlign:"center"}}>admin@example.com / admin123</div>
      </div>
    </div>
  )
}
