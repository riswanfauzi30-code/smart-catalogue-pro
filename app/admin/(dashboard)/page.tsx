export default function Page(){
  return (
    <div style={{padding:24,fontFamily:"system-ui"}}>
      <h1 style={{fontSize:24,fontWeight:"bold",marginBottom:16}}>Dashboard Admin - MASUK BRO 🚀</h1>
      <p style={{marginBottom:24,color:"#666"}}>Production 2878f4a - Fix polos sukses!</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16}}>
        <a href="/admin/produk" style={{padding:20,border:"1px solid #ddd",borderRadius:12,textDecoration:"none",background:"#f9f9f9"}}>
          <h3>📦 Produk</h3><p>Kelola produk</p>
        </a>
        <a href="/admin/kategori" style={{padding:20,border:"1px solid #ddd",borderRadius:12,textDecoration:"none",background:"#f9f9f9"}}>
          <h3>📂 Kategori</h3><p>Kelola kategori</p>
        </a>
        <a href="/" style={{padding:20,border:"1px solid #ddd",borderRadius:12,textDecoration:"none",background:"#f9f9f9"}}>
          <h3>🏠 Homepage</h3><p>Lihat katalog</p>
        </a>
        <a href="/admin/login" style={{padding:20,border:"1px solid #ddd",borderRadius:12,textDecoration:"none",background:"#ffe0e0"}}>
          <h3>🚪 Logout</h3><p>Keluar admin</p>
        </a>
      </div>
    </div>
  )
}
