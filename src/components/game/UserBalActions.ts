"use server"

import prisma from "@prisma/index"

export async function getUserBal(email: string) {
    const userData = await prisma.user.findUnique({
        where: {
            email
        }
    });

    return userData?.bal;
}