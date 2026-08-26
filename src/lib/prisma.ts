import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ["error"],
})

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

// Jangan throw kalau DATABASE_URL kosong, biar login page tetap hidup
if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL missing - prisma will fail on DB calls but won't crash build")
}
