import Image from "next/image";
import { Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    nama: string;
    harga: number;
    deskripsi: string;
    stok: number;
    kategori: string;
    gambar_url: string | null;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {product.gambar_url ? (
            <Image
              src={product.gambar_url}
              alt={product.nama}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Package className="h-16 w-16 text-muted-foreground/40" />
            </div>
          )}
          <Badge className="absolute left-3 top-3" variant="secondary">
            {product.kategori}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="line-clamp-1 font-semibold">{product.nama}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {product.deskripsi}
        </p>
        <p className="mt-2 text-lg font-bold text-primary">
          {formatCurrency(product.harga)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Badge variant={product.stok > 0 ? "default" : "destructive"}>
          {product.stok > 0 ? `Stok: ${product.stok}` : "Habis"}
        </Badge>
      </CardFooter>
    </Card>
  );
}
