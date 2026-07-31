import { requireAuth } from "@/lib/session";
import { ProductForm } from "@/components/admin/product-form";

export default async function NewProductPage() {
  await requireAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Tambah Produk Baru</h1>
        <p className="text-muted-foreground">
          Isi form di bawah untuk menambahkan produk baru
        </p>
      </div>
      <ProductForm mode="create" />
    </div>
  );
}
