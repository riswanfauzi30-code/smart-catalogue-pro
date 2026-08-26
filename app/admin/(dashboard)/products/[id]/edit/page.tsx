import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/session";
import { getProductById } from "@/lib/products";
import { ProductForm } from "@/components/admin/product-form";

interface EditProductPageProps {
  params: { id: string };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  await requireAuth();

  const product = await getProductById(params.id);
  if (!product) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Edit Produk</h1>
        <p className="text-muted-foreground">
          Perbarui informasi produk: {product.name}
        </p>
      </div>
      <ProductForm mode="edit" initialData={product} />
    </div>
  );
}
