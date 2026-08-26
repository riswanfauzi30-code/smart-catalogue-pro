"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/admin/image-upload";
import { PRODUCT_CATEGORIES } from "@/lib/utils";

interface ProductFormData {
  nama: string;
  harga: number;
  deskripsi: string;
  stok: number;
  kategori: string;
  gambar_url: string | null;
}

interface ProductFormProps {
  initialData?: ProductFormData & { id?: string };
  mode: "create" | "edit";
}

export function ProductForm({ initialData, mode }: ProductFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    nama: initialData?.nama ?? "",
    harga: initialData?.harga ?? 0,
    deskripsi: initialData?.deskripsi ?? "",
    stok: initialData?.stok ?? 0,
    kategori: initialData?.kategori ?? "",
    gambar_url: initialData?.gambar_url ?? null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url =
        mode === "create"
          ? "/api/products"
          : `/api/products/${initialData?.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Terjadi kesalahan");
      }

      toast.success(
        mode === "create"
          ? "Produk berhasil ditambahkan"
          : "Produk berhasil diperbarui"
      );
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nama">Nama Produk *</Label>
            <Input
              id="nama"
              value={formData.nama}
              onChange={(e) =>
                setFormData({ ...formData, nama: e.target.value })
              }
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="harga">Harga (IDR) *</Label>
            <Input
              id="harga"
              type="number"
              min="0"
              value={formData.harga || ""}
              onChange={(e) =>
                setFormData({ ...formData, harga: Number(e.target.value) })
              }
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stok">Stok *</Label>
            <Input
              id="stok"
              type="number"
              min="0"
              value={formData.stok || ""}
              onChange={(e) =>
                setFormData({ ...formData, stok: Number(e.target.value) })
              }
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="kategori">Kategori *</Label>
            <Select
              value={formData.kategori}
              onValueChange={(value) =>
                setFormData({ ...formData, kategori: value })
              }
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {PRODUCT_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <ImageUpload
            value={formData.gambar_url}
            onChange={(url) => setFormData({ ...formData, gambar_url: url })}
            disabled={isLoading}
          />

          <div className="space-y-2">
            <Label htmlFor="deskripsi">Deskripsi *</Label>
            <Textarea
              id="deskripsi"
              value={formData.deskripsi}
              onChange={(e) =>
                setFormData({ ...formData, deskripsi: e.target.value })
              }
              rows={6}
              required
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? "Menyimpan..."
            : mode === "create"
              ? "Tambah Produk"
              : "Simpan Perubahan"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Batal
        </Button>
      </div>
    </form>
  );
}
