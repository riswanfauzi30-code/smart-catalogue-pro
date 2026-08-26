"use client";

import Link from "next/link";
import { Package } from "lucide-react";
import { useSession } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Package className="h-6 w-6 text-primary" />
          <span>Smart Catalogue Pro</span>
        </Link>
        <nav>
          <Link
            href="/admin"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {session?.user?.name || "Admin"}
          </Link>
        </nav>
      </div>
    </header>
  );
}