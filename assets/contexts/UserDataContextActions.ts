"use server"

import { iUserData } from "@assets/types/UserData/types";
import prisma from "@prisma/index";

export async function readUserData(email: string): Promise<iUserData> {
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

    return userData as iUserData;
}