import Link from "next/link";
import { Package, Plus, FileSpreadsheet, Table2 } from "lucide-react";
import { requireAuth } from "@/lib/session";
import { getProductStats } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSignOut } from "@/components/admin/admin-sign-out";

export default async function AdminDashboardPage() {
  await requireAuth();
  const stats = await getProductStats();
  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Kelola katalog produk Anda</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild className="bg-green-50">
            <Link href="/admin/import"><FileSpreadsheet className="mr-2 h-4 w-4" />Import Excel</Link>
          </Button>
          <Button variant="outline" asChild className="bg-blue-50">
            <Link href="/admin/import"><Table2 className="mr-2 h-4 w-4" />Import Sheets</Link>
          </Button>
          <Button asChild><Link href="/admin/products/new"><Plus className="mr-2 h-4 w-4" />Tambah Produk</Link></Button>
          <AdminSignOut />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card><CardHeader className="pb-2"><CardDescription>Total Produk</CardDescription><CardTitle className="text-3xl">{stats.totalProducts}</CardTitle></CardHeader><CardContent><Package className="h-4 w-4 text-muted-foreground" /></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardDescription>Total Stok</CardDescription><CardTitle className="text-3xl">{stats.totalStock}</CardTitle></CardHeader><CardContent><Package className="h-4 w-4 text-muted-foreground" /></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardDescription>Kategori</CardDescription><CardTitle className="text-3xl">{stats.categories}</CardTitle></CardHeader><CardContent><Package className="h-4 w-4 text-muted-foreground" /></CardContent></Card>
      </div>
      <div className="mt-8"><Button variant="outline" asChild><Link href="/admin/products">Kelola Semua Produk</Link></Button></div>
    </div>
  );
}