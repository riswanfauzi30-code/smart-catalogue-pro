"use client"
import { useState } from "react"
import Link from "next/link"

export default function ImportPage() {
  const [status, setStatus] = useState("")

  const handleExcel = async (e: any) => {
    const file = e.target.files[0]
    if (!file) return
    setStatus("Uploading Excel...")
    const form = new FormData()
    form.append("file", file)
    const res = await fetch("/api/import/excel", { method: "POST", body: form })
    const data = await res.json()
    setStatus(res.ok? `Berhasil import ${data.count} produk!` : `Error: ${data.error}`)
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Link href="/admin" className="text-sm text-blue-600 mb-4 block">← Kembali ke Dashboard</Link>
      <h1 className="text-2xl font-bold mb-6">Import Produk</h1>

      <div className="space-y-6">
        <div className="border rounded-xl p-6 bg-white">
          <h2 className="font-semibold mb-2">📥 Import dari Excel</h2>
          <p className="text-sm text-gray-500 mb-3">Format: name, price, stock, category</p>
          <input type="file" accept=".xlsx,.xls" onChange={handleExcel} className="block w-full text-sm border rounded p-2" />
        </div>

        <div className="border rounded-xl p-6 bg-white">
          <h2 className="font-semibold mb-2">📊 Import dari Google Sheets</h2>
          <p className="text-sm text-gray-500 mb-3">Paste link Google Sheets yang sudah di-publish sebagai CSV</p>
          <input id="sheetsUrl" placeholder="https://docs.google.com/..." className="w-full border rounded p-2 text-sm mb-2" />
          <button onClick={async () => {
            const url = (document.getElementById('sheetsUrl') as HTMLInputElement).value
            setStatus("Importing dari Sheets...")
            const res = await fetch("/api/import/sheets", { method: "POST", body: JSON.stringify({ url }), headers: { "Content-Type": "application/json" } })
            const data = await res.json()
            setStatus(res.ok? `Berhasil import ${data.count} produk!` : `Error: ${data.error}`)
          }} className="bg-sky-600 text-white px-4 py-2 rounded text-sm">Import</button>
        </div>

        {status && <div className="p-3 bg-gray-100 rounded text-sm">{status}</div>}
      </div>
    </div>
  )
}