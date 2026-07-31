"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useTransition } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRODUCT_CATEGORIES } from "@/lib/utils";

interface CatalogFiltersProps {
  categories: string[];
}

export function CatalogFilters({ categories }: CatalogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const debounceRef = useRef<NodeJS.Timeout>();

  const currentSearch = searchParams.get("search") ?? "";
  const currentCategory = searchParams.get("kategori") ?? "all";

  const updateFilters = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");

      startTransition(() => {
        router.push(`/?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  const handleSearchChange = (value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => updateFilters("search", value), 300);
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari produk..."
          defaultValue={currentSearch}
          className="pl-10"
          disabled={isPending}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>
      <Select
        value={currentCategory}
        onValueChange={(value) => updateFilters("kategori", value)}
        disabled={isPending}
      >
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Kategori" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Kategori</SelectItem>
          {PRODUCT_CATEGORIES.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
          {categories
            .filter(
              (cat) =>
                !PRODUCT_CATEGORIES.includes(
                  cat as (typeof PRODUCT_CATEGORIES)[number]
                )
            )
            .map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
