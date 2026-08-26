import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getProducts } from "@/lib/products";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") ?? undefined;
    const kategori = searchParams.get("kategori") ?? undefined;
    const page = parseInt(searchParams.get("page") ?? "1", 10);

    const result = await getProducts({ search, kategori, page });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil data produk" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { nama, harga, deskripsi, stok, kategori, gambar_url } = body;

    if (!nama || harga === undefined || !deskripsi || stok === undefined || !kategori) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        nama,
        harga: Number(harga),
        deskripsi,
        stok: Number(stok),
        kategori,
        gambar_url: gambar_url ?? null,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Gagal membuat produk" },
      { status: 500 }
    );
  }
}
