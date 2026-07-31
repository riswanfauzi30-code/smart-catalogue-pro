import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export const PRODUCT_CATEGORIES = [
  "Elektronik",
  "Fashion",
  "Makanan & Minuman",
  "Kesehatan",
  "Olahraga",
  "Rumah Tangga",
  "Lainnya",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const ITEMS_PER_PAGE = 12;
