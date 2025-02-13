import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export const models = {
    user: prisma.user
}