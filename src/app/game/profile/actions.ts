"use server"

import prisma from "@prisma/index"

export async function readUserData(email: string) {
    const userData = await prisma.user.findUnique({
        where: {
            email
        }
    });

    return userData;
}