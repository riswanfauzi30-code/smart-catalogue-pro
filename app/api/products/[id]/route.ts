import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteImage } from "@/lib/cloudinary";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil data produk" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });
    }

    const body = await request.json();
    const { nama, harga, deskripsi, stok, kategori, gambar_url } = body;

    if (!nama || harga === undefined || !deskripsi || stok === undefined || !kategori) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    if (
      existing.gambar_url &&
      gambar_url !== existing.gambar_url
    ) {
      await deleteImage(existing.gambar_url);
    }

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        nama,
        harga: Number(harga),
        deskripsi,
        stok: Number(stok),
        kategori,
        gambar_url: gambar_url ?? null,
      },
    });

    return NextResponse.json(product);
  } catch {
    return NextResponse.json(
      { error: "Gagal memperbarui produk" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });
    }

    if (existing.gambar_url) {
      await deleteImage(existing.gambar_url);
    }

    await prisma.product.delete({ where: { id: params.id } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Gagal menghapus produk" },
      { status: 500 }
    );
  }
}
