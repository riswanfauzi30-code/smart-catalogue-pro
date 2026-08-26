import Link from "next/link";
import { Package } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/admin" className="flex items-center gap-2 font-bold">
            <Package className="h-5 w-5 text-primary" />
            <span>Admin Panel</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link
              href="/admin"
              className="text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/products"
              className="text-muted-foreground hover:text-foreground"
            >
              Produk
            </Link>
            <Link
              href="/katalog"
              className="text-muted-foreground hover:text-foreground"
            >
              Lihat Katalog
            </Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </>
  );
}
