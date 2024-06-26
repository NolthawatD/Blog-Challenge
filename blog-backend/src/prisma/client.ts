import { PrismaService } from "./prisma.service"
export * from "@prisma/client"

const prisma: PrismaService = new PrismaService()

export { prisma };