"use client"

import { useSession } from "next-auth/react";
import Card from "../global/Card";
import { Dispatch, SetStateAction, useContext } from "react";
import { UserContext } from "@assets/contexts/UserDataContext";

export default function UserBal(props: {showBal: boolean, setShowBal: Dispatch<SetStateAction<boolean>>}) {
    const {status} = useSession();
    const { bal: userBal } = useContext(UserContext);

    if (status === "loading") return;

    return <Card>
        <div
            onClick={() => props.setShowBal(prev => !prev)}
            className={`flex ${!props.showBal ? "bg-zinc-800" : "bg-zinc-400"}
            hover:cursor-pointer`}
        >
            <p
                className={`font-extrabold text-xl bg-zinc-50`}
            >
                R$
            </p>
            <p className="text-zinc-800 font-medium text-lg">{formatSaldo(userBal)}</p>
        </div>
    </Card>
}

export function formatSaldo(saldo: number) {
    return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(saldo).replace("R$ ", "");
}