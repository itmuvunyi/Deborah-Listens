let PrismaClient: any
let prisma: any = null

try {
  const prismaModule = require("@prisma/client")
  PrismaClient = prismaModule.PrismaClient

  const globalForPrisma = globalThis as unknown as {
    prisma: any | undefined
  }

  prisma = globalForPrisma.prisma ?? new PrismaClient()

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma
  }
} catch (error) {
  console.log("[v0] Prisma not available, using JSON fallback:", String(error))
  prisma = null
}

export { prisma }

export function getPrismaClient() {
  return prisma
}
