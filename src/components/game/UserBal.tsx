"use client"

import { useSession } from "next-auth/react";
import Card from "../global/Card";
import { ComponentProps, useEffect, useState } from "react";
import { getUserBal } from "./UserBalActions";

export default function UserBal(props: ComponentProps<"figure">) {
    const {data: session, status} = useSession();
    const [userBal, setUserBal] = useState<number>(0);
    const [showBal, setShowBal] = useState<boolean>(false);

    useEffect(() => {
        const main = async () => {
            if (session?.user?.email) {
                const userBalFetched = await getUserBal(session.user.email);
                setUserBal(userBalFetched!);
            }
        }

        main()
    }, [session?.user?.email]);

    if (status === "loading") return;

    return <Card className={props.className}>
        <div
            onClick={() => setShowBal(prev => !prev)}
            className={`flex ${!showBal ? "bg-zinc-800" : "bg-zinc-400"}
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

function formatSaldo(saldo: number) {
    return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(saldo).replace("R$ ", "");
}