"use client"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("admin@example.com")
  const [pass, setPass] = useState("admin123")
  const [msg, setMsg] = useState("")

  const handleLogin = () => {
    if (email === "admin@example.com" && pass === "admin123") {
      localStorage.setItem("isAdmin", "true")
      window.location.href = "/admin"
    } else {
      setMsg("Email atau password salah!")
    }
  }

  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f5f5f5"}}>
      <div style={{background:"white",padding:32,borderRadius:12,width:360,boxShadow:"0 4px 20px rgba(0,0,0,0.1)"}}>
        <h1 style={{fontSize:24,fontWeight:"bold",marginBottom:20,textAlign:"center"}}>Admin Login</h1>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{width:"100%",padding:10,marginBottom:12,border:"1px solid #ddd",borderRadius:8}} />
        <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password" style={{width:"100%",padding:10,marginBottom:16,border:"1px solid #ddd",borderRadius:8}} />
        {msg && <div style={{color:"red",marginBottom:12,fontSize:14}}>{msg}</div>}
        <button onClick={handleLogin} style={{width:"100%",padding:11,background:"black",color:"white",borderRadius:8,fontWeight:"bold"}}>LOGIN</button>
        <div style={{marginTop:12,fontSize:12,color:"#888",textAlign:"center"}}>Nuclear mode - no Prisma</div>
      </div>
    </div>
  )
}
