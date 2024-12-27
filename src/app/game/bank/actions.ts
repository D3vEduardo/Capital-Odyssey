"use server"

import { formatSaldo } from "@/components/game/UserBal";
import { iUserData } from "@assets/types/UserData/types";
import prisma from "@prisma/index";

type Response = {
    message: string,
    responseType: "error" | "success",
    remettingData?: iUserData
}

export async function TransferBal(adressee: string, remettingEmail: string, value: number): Promise<Response> {
    const remettingData: iUserData = await prisma.user.findUnique({
        where: {
            email: remettingEmail
        }
    }) as iUserData;
    const adresseeData = await prisma.user.findUnique({
        where: {
            balCard: adressee
        }
    });

    if (!adresseeData) return {
        message: "Destinatário inexistente!",
        responseType: "error",
        remettingData
    };

    if (remettingData.bal < value) return {
        message: `Remetente não possuí R$${formatSaldo(value)}.`,
        responseType: "error",
        remettingData
    }

    adresseeData.bal += value;
    remettingData.bal -= value;

    await prisma.user.upsert({
        where: {id: adresseeData.id},
        create: adresseeData,
        update: adresseeData
    });

    const remettingDataUpdated = await prisma.user.upsert({
        where: {id: remettingData.id},
        create: remettingData,
        update: remettingData
    });

    return {
        message: "Transferência concluída com sucesso!",
        responseType: "success",
        remettingData: remettingDataUpdated
    };
}