import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

export type UserData = {
    id: string;
    bal: number;
    email: string;
}