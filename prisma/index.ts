import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type UserData = {
    id: number;
    email: string;
    bal: number;
}

export default prisma;