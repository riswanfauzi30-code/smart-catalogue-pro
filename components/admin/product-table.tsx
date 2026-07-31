"use client"

import Link from "next/link"
import { Edit, Trash2, Package, MoreVertical } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteProduct } from "@/app/admin/products/actions"
import { toast } from "sonner"
import { useState } from "react"

interface Product {
  id: string
  sku?: string | null
  nama: string
  harga: number
  stok: number
  kategori: string
  gambar?: string | null
}

function DeleteButton({ id, nama }: { id: string, nama: string }) {
  const [open, setOpen] = useState(false)

  async function handleDelete() {
    const res = await deleteProduct(id)
    if (res.success) {
      toast.success(res.message)
      setOpen(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Yakin mau hapus?</AlertDialogTitle>
          <AlertDialogDescription>
            Produk <span className="font-semibold">{nama}</span> bakal dihapus permanen dari database.
            Aksi ini ga bisa dibatalin.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
            Ya, Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function DeleteMenuItem({ id, nama }: { id: string, nama: string }) {
  const [open, setOpen] = useState(false)

  async function handleDelete() {
    const res = await deleteProduct(id)
    if (res.success) {
      toast.success(res.message)
      setOpen(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="w-full flex items-center text-red-600 px-2 py-1.5 text-sm rounded-sm hover:bg-accent">
          <Trash2 className="mr-2 h-4 w-4" />
          Hapus
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Yakin mau hapus?</AlertDialogTitle>
          <AlertDialogDescription>
            Produk <span className="font-semibold">{nama}</span> bakal dihapus permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
            Ya, Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function ProductTable({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Package className="h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">Produk tidak ditemukan</h3>
        <p className="text-muted-foreground">
          Coba kata kunci lain atau tambah produk baru.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* TABEL VIEW - Laptop/Desktop aja ≥768px */}
      <div className="hidden md:block rounded-md border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-">Gambar</TableHead>
                <TableHead className="hidden lg:table-cell">Kode</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead className="hidden lg:table-cell">Kategori</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                      {product.gambar? (
                        <img
                          src={product.gambar}
                          alt={product.nama}
                          className="h-full w-full rounded-md object-cover"
                        />
                      ) : (
                        <Package className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell font-mono text-xs text-muted-foreground">
                    {product.sku || "-"}
                  </TableCell>
                  <TableCell className="font-medium">{product.nama}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge variant="outline">{product.kategori}</Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    Rp {product.harga.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.stok > 0? "default" : "destructive"}>
                      {product.stok}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <DeleteButton id={product.id} nama={product.nama} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* CARD VIEW - HP + Tablet <768px */}
      <div className="grid gap-4 md:hidden">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-lg border bg-card p-4 shadow-sm"
          >
            <div className="flex gap-4">
              <div className="h-20 w-20 flex-shrink-0 rounded-md bg-muted flex items-center justify-center">
                {product.gambar? (
                  <img
                    src={product.gambar}
                    alt={product.nama}
                    className="h-full w-full rounded-md object-cover"
                  />
                ) : (
                  <Package className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-semibold leading-tight truncate">
                      {product.nama}
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono">
                      {product.sku || "-"}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DeleteMenuItem id={product.id} nama={product.nama} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {product.kategori}
                  </Badge>
                  <Badge variant={product.stok > 0? "default" : "destructive"}>
                    Stok: {product.stok}
                  </Badge>
                </div>
                <p className="mt-2 text-lg font-bold">
                  Rp {product.harga.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}