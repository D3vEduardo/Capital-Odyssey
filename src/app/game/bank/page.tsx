"use client"

import UserBal from "@/components/game/UserBal";
import Button from "@/components/global/Button";
import EyeOn from "@public/svg/icons/openon.svg";
import EyeOff from "@public/svg/icons/openoff.svg";
import { useState } from "react";
import Image from "next/image";

const ReturnEye = {
    EyeOn,
    EyeOff
}

export default function Bank() {
    const [showBal, setShowBal] = useState<boolean>(false);
    return (
        <div
            className="w-screen h-screen bg-zinc-950 flex flex-col
            items-center justify-center"
        >
            <section
                className="flex items-center justify-center gap-x-4"
            >
                <UserBal
                    showBal={showBal}
                    setShowBal={setShowBal}
                />
                <Button className="p-1">
                    <Image
                        alt="Mostrar ou ocultar saldo"
                        width={100}
                        height={100}
                        src={showBal ? ReturnEye.EyeOff : ReturnEye.EyeOn}
                        onClick={() => {
                            setShowBal(prev => !prev)
                        }}
                        className="w-8"
                    />
                </Button>
            </section>
        </div>
    )
}