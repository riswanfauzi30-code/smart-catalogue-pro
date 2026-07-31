import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/utils";

export interface ProductFilters {
  search?: string;
  kategori?: string;
  page?: number;
}

export async function getProducts(filters: ProductFilters = {}) {
  const { search = "", kategori = "", page = 1 } = filters;
  const skip = (page - 1) * ITEMS_PER_PAGE;

  const where: Prisma.ProductWhereInput = {};

  if (search) {
    where.OR = [
      { nama: { contains: search, mode: "insensitive" } },
      { deskripsi: { contains: search, mode: "insensitive" } },
    ];
  }

  if (kategori && kategori !== "all") {
    where.kategori = kategori;
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: ITEMS_PER_PAGE,
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products,
    total,
    totalPages: Math.ceil(total / ITEMS_PER_PAGE),
    currentPage: page,
  };
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({ where: { id } });
}

export async function getCategories() {
  const result = await prisma.product.findMany({
    select: { kategori: true },
    distinct: ["kategori"],
    orderBy: { kategori: "asc" },
  });
  return result.map((r) => r.kategori);
}

export async function getProductStats() {
  const [totalProducts, totalStock, categories] = await Promise.all([
    prisma.product.count(),
    prisma.product.aggregate({ _sum: { stok: true } }),
    prisma.product.groupBy({
      by: ["kategori"],
      _count: { kategori: true },
    }),
  ]);

  return {
    totalProducts,
    totalStock: totalStock._sum.stok ?? 0,
    categories: categories.length,
  };
}
