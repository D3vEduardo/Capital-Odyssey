"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Game() {
    const router = useRouter();
    const { data: session, status } = useSession();
    
    useEffect(() => {
        if(status === "loading" || status === "authenticated") return;
        if(status === "unauthenticated") {
            router.push("/");
        }
        
    }, [session, router, status]);

    if (status === "loading") {
        return (
            <div
                className="flex flex-col items-center w-screen h-screen
                bg-zinc-950"
            >
                <div className="mt-28"
                >
                    <h1 className="text-zinc-100">
                        Site <span className="text-zinc-950 text-stroke-sm lg:text-stroke-lg">Carregando...</span>
                    </h1>
                </div>
            </div>
        )
    }

    return (
        <div
            className="flex flex-col items-center w-screen h-screen
            bg-zinc-950"
        >
            <div className="mt-28"
            >
                <h1 className="text-zinc-100">Seu nome: {session?.user?.name}</h1>
            </div>
        </div>
    )
}
