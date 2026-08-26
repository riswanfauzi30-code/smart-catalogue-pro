export default function AdminPage(){
  return (
    <div style={{minHeight:"100vh",background:"#f8f8f8",padding:32,fontFamily:"system-ui"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32}}>
          <div>
            <h1 style={{fontSize:28,fontWeight:"800"}}>Dashboard Admin 🚀</h1>
            <p style={{color:"#666",marginTop:4}}>Smart Catalogue Pro - Production cakep!</p>
          </div>
          <a href="/" style={{padding:"10px 16px",background:"white",border:"1px solid #ddd",borderRadius:10,textDecoration:"none",color:"black"}}>← Lihat Katalog</a>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:16}}>
          <a href="/admin/produk" style={{background:"white",padding:24,borderRadius:16,border:"1px solid #eee",textDecoration:"none",color:"black"}}>
            <div style={{fontSize:32,marginBottom:8}}>📦</div>
            <div style={{fontWeight:"700",fontSize:16}}>Produk</div>
            <div style={{color:"#666",fontSize:14,marginTop:4}}>Kelola produk katalog</div>
            <div style={{marginTop:12,fontSize:12,background:"black",color:"white",display:"inline-block",padding:"6px 12px",borderRadius:6}}>Buka →</div>
          </a>
          <a href="/admin/kategori" style={{background:"white",padding:24,borderRadius:16,border:"1px solid #eee",textDecoration:"none",color:"black"}}>
            <div style={{fontSize:32,marginBottom:8}}>📁</div>
            <div style={{fontWeight:"700"}}>Kategori</div>
            <div style={{color:"#666",fontSize:14,marginTop:4}}>Kelola kategori produk</div>
            <div style={{marginTop:12,fontSize:12,background:"#f5f5f5",border:"1px solid #eee",display:"inline-block",padding:"6px 12px",borderRadius:6}}>Buka →</div>
          </a>
          <a href="/" style={{background:"white",padding:24,borderRadius:16,border:"1px solid #eee",textDecoration:"none",color:"black"}}>
            <div style={{fontSize:32,marginBottom:8}}>🏠</div>
            <div style={{fontWeight:"700"}}>Homepage</div>
            <div style={{color:"#666",fontSize:14,marginTop:4}}>Lihat katalog publik</div>
            <div style={{marginTop:12,fontSize:12,background:"#f5f5f5",border:"1px solid #eee",display:"inline-block",padding:"6px 12px",borderRadius:6}}>Lihat →</div>
          </a>
          <a href="/admin/login" style={{background:"#fff0f0",padding:24,borderRadius:16,border:"1px solid #ffd0d0",textDecoration:"none",color:"black"}}>
            <div style={{fontSize:32,marginBottom:8}}>🚪</div>
            <div style={{fontWeight:"700"}}>Logout</div>
            <div style={{color:"#666",fontSize:14,marginTop:4}}>Keluar admin</div>
          </a>
        </div>
      </div>
    </div>
  )
}
