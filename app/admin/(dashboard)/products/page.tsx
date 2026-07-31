import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { requireAuth } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductTable } from "@/components/admin/product-table";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  await requireAuth();

  const query = searchParams.q || "";

  const products = await prisma.product.findMany({
    where: query
      ? {
          OR: [
            { nama: { contains: query } },
            { sku: { contains: query } },
            { kategori: { contains: query } },
          ],
        }
      : {},
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Kelola Produk</h1>
          <p className="text-muted-foreground">
            {products.length} produk {query && `hasil dari "${query}"`}
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Produk
          </Link>
        </Button>
      </div>

      <form className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            name="q"
            placeholder="Cari nama, kode, atau kategori..."
            defaultValue={query}
            className="pl-10"
          />
        </div>
      </form>

      <ProductTable products={products} />
    </div>
  );
}