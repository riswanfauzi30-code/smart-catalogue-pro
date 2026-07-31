# Smart Catalogue Pro

Aplikasi katalog produk fullstack modern dengan Next.js 14, Prisma, PostgreSQL, NextAuth, dan Cloudinary.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL
- **Auth:** NextAuth.js (Credentials)
- **Storage:** Cloudinary (upload gambar produk)

## Fitur

- Katalog produk publik dengan grid, search, filter kategori, dan pagination
- Dashboard admin dengan login terproteksi
- CRUD produk lengkap (Create, Read, Update, Delete)
- Upload gambar produk ke Cloudinary
- UI responsive dan siap deploy ke Vercel

## Struktur Project

```
smart-catalogue-pro/
├── app/
│   ├── api/              # API routes (auth, products, upload)
│   ├── admin/            # Dashboard admin
│   ├── layout.tsx
│   ├── page.tsx          # Halaman katalog publik
│   └── globals.css
├── components/
│   ├── admin/            # Komponen admin (form, table, upload)
│   ├── catalog/          # Komponen katalog (card, filter, pagination)
│   ├── layout/           # Header, footer
│   ├── providers/        # Auth & toast providers
│   └── ui/               # shadcn/ui components
├── lib/
│   ├── auth.ts           # NextAuth config
│   ├── cloudinary.ts     # Cloudinary upload helper
│   ├── prisma.ts         # Prisma client
│   ├── products.ts       # Product queries
│   └── utils.ts          # Utilities
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed data
└── types/
    └── next-auth.d.ts
```

## Setup Lokal

### 1. Clone & Install

```bash
cd smart-catalogue-pro
npm install
```

### 2. Environment Variables

Salin file environment:

```bash
cp .env.example .env
```

Isi variabel di `.env`:

| Variable | Deskripsi |
|----------|-----------|
| `DATABASE_URL` | Connection string PostgreSQL |
| `NEXTAUTH_URL` | URL aplikasi (`http://localhost:3000`) |
| `NEXTAUTH_SECRET` | Secret random (min 32 karakter) |
| `ADMIN_EMAIL` | Email admin untuk seed |
| `ADMIN_PASSWORD` | Password admin untuk seed |
| `CLOUDINARY_CLOUD_NAME` | Cloud name dari Cloudinary |
| `CLOUDINARY_API_KEY` | API key Cloudinary |
| `CLOUDINARY_API_SECRET` | API secret Cloudinary |

Generate `NEXTAUTH_SECRET`:

```bash
openssl rand -base64 32
```

### 3. Database Setup

Pastikan PostgreSQL sudah berjalan, lalu:

```bash
npm run db:push
npm run db:seed
```

### 4. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk katalog publik.

Login admin di [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

**Default credentials (setelah seed):**
- Email: `admin@example.com`
- Password: `admin123`

## Deploy ke Vercel

### 1. Push ke GitHub

```bash
git init
git add .
git commit -m "Initial commit: Smart Catalogue Pro"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Import ke Vercel

1. Buka [vercel.com](https://vercel.com) → New Project → Import repo
2. Tambahkan Environment Variables (sama seperti `.env`)
3. Deploy

### 3. Database Production

Gunakan PostgreSQL managed service:
- [Neon](https://neon.tech) (gratis)
- [Supabase](https://supabase.com) (gratis)
- [Railway](https://railway.app)

Set `DATABASE_URL` di Vercel dengan connection string production.

Setelah deploy, jalankan seed via Vercel CLI atau lokal dengan DATABASE_URL production:

```bash
npm run db:push
npm run db:seed
```

### 4. Cloudinary

1. Buat akun di [cloudinary.com](https://cloudinary.com)
2. Salin Cloud Name, API Key, dan API Secret ke environment Vercel

## Scripts

| Command | Deskripsi |
|---------|-----------|
| `npm run dev` | Development server |
| `npm run build` | Build production |
| `npm run start` | Start production server |
| `npm run db:push` | Push schema ke database |
| `npm run db:seed` | Seed admin & sample products |
| `npm run db:studio` | Buka Prisma Studio |

## API Endpoints

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/api/products` | No | List produk (search, filter, pagination) |
| POST | `/api/products` | Yes | Buat produk baru |
| GET | `/api/products/[id]` | No | Detail produk |
| PUT | `/api/products/[id]` | Yes | Update produk |
| DELETE | `/api/products/[id]` | Yes | Hapus produk |
| POST | `/api/upload` | Yes | Upload gambar ke Cloudinary |

## License

MIT
