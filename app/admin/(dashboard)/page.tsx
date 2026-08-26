export default function AdminPage(){
  return (
    <div style={{minHeight:"100vh",background:"#f8f8f8",padding:32,fontFamily:"system-ui"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32}}>
          <div><h1 style={{fontSize:28,fontWeight:"800"}}>Dashboard Admin 🚀</h1><p style={{color:"#666",marginTop:4}}>Smart Catalogue Pro</p></div>
          <a href="/" style={{padding:"10px 16px",background:"white",border:"1px solid #ddd",borderRadius:10,textDecoration:"none",color:"black"}}>← Lihat Katalog</a>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:16}}>
          <a href="/admin/produk" style={{background:"white",padding:24,borderRadius:16,border:"1px solid #eee",textDecoration:"none",color:"black"}}><div style={{fontSize:32}}>📦</div><div style={{fontWeight:"700",marginTop:8}}>Produk</div><div style={{color:"#666",fontSize:14}}>Kelola produk</div></a>
          <a href="/admin/kategori" style={{background:"white",padding:24,borderRadius:16,border:"1px solid #eee",textDecoration:"none",color:"black"}}><div style={{fontSize:32}}>📁</div><div style={{fontWeight:"700",marginTop:8}}>Kategori</div><div style={{color:"#666",fontSize:14}}>Kelola kategori</div></a>
          <a href="/admin/satuan" style={{background:"white",padding:24,borderRadius:16,border:"1px solid #eee",textDecoration:"none",color:"black"}}><div style={{fontSize:32}}>📏</div><div style={{fontWeight:"700",marginTop:8}}>Satuan</div><div style={{color:"#666",fontSize:14}}>Pcs, Pack, Dus, Kg</div><div style={{marginTop:8,fontSize:12,background:"black",color:"white",display:"inline-block",padding:"4px 10px",borderRadius:6}}>Baru ✨</div></a>
          <a href="/" style={{background:"white",padding:24,borderRadius:16,border:"1px solid #eee",textDecoration:"none",color:"black"}}><div style={{fontSize:32}}>🏠</div><div style={{fontWeight:"700",marginTop:8}}>Homepage</div><div style={{color:"#666",fontSize:14}}>Lihat katalog</div></a>
        </div>
      </div>
    </div>
  )
}
