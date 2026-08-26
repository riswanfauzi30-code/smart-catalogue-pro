'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const res = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (res?.ok) { router.push('/admin') } else { alert('Login gagal!') }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow w-full max-w-sm border">
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
        <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full border p-2 rounded mb-3" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border p-2 rounded mb-4" />
        <button disabled={loading} className="w-full bg-black text-white p-2 rounded">{loading ? '...' : 'Login'}</button>
      </form>
    </div>
  )
}
