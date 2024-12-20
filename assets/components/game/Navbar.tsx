"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Navbar() {
    const router = useRouter();
    const { data: session, status } = useSession();

    if(status === "loading") return;

    return (
        <nav
            className="flex justify-between items-center absolute w-screen px-4 py-4 bg-zinc-900
            rounded-bl-3xl rounded-br-3xl"
        >
            <div
                className="flex items-center justify-center gap-3"
            >
                < Image
                    className="w-12 rounded border border-zinc-100"
                    unoptimized
                    width={100}
                    height={100}
                    src={session?.user?.image || ""}
                    alt={`Foto de peril de ${session?.user?.name}.`}
                />
                <h1
                    className="font-medium text-xl text-zinc-200"
                >Olá,<br/><span className="font-black text-zinc-50">{session?.user?.name}</span>!
                </h1>
            </div>
            </nav>
    )
}