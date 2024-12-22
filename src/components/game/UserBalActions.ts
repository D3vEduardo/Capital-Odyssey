"use server"

import prisma from "@prisma/index"

export async function getUserBal(email: string) {
    const userIdentifier = await prisma.identifier.findUnique({
        where: {
            email
        }
    });
    const userData = await prisma.user.findUnique({
        where: {
            id: userIdentifier?.id
        }
    });

    return userData?.bal;
}