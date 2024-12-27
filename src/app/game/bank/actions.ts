"use server"

import { formatSaldo } from "@/components/game/UserBal";
import { iUserData } from "@assets/types/UserData/types";
import prisma from "@prisma/index";

type Response = {
    message: string,
    responseType: "error" | "success",
    remettingData?: iUserData
}

export async function TransferBal(addressee: string, remettingEmail: string, value: number): Promise<Response> {
    const remettingData: iUserData = await prisma.user.findUnique({
        where: {
            email: remettingEmail
        }
    }) as iUserData;
    const addresseData = await prisma.user.findUnique({
        where: {
            balCard: addressee
        }
    });

    if (!addresseData) return {
        message: "Destinatário inexistente!",
        responseType: "error",
        remettingData
    };

    if (remettingData.bal < value) return {
        message: `Remetente não possuí R$${formatSaldo(value)}.`,
        responseType: "error",
        remettingData
    }

    addresseData.bal += value;
    remettingData.bal -= value;

    await prisma.user.update({
        where: {id: addresseData.id},
        data: {
            bal: addresseData.bal,
            balCard: addresseData.balCard,
            email: addresseData.email,
        }
    });

    const remettingDataUpdated = await prisma.user.update({
        where: {id: remettingData.id},
        data: {
            bal: remettingData.bal,
            balCard: remettingData.balCard,
            email: remettingData.email,
        }
    });

    return {
        message: "Transferência concluída com sucesso!",
        responseType: "success",
        remettingData: remettingDataUpdated
    };
}