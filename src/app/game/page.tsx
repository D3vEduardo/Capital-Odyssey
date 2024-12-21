"use client";
import Card from "@/components/global/Card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiUser } from "react-icons/fi";

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
                className="flex justify-center items-center w-screen h-screen
                bg-zinc-950"
            >
                <div
                >
                    <h1 className="text-zinc-100 text-4xl font-extrabold">
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
            <Card hover={true}
                className="mt-28"
                onClick={() => router.push("/game/profile")}
            >
                <div
                    className="flex flex-col items-center justify-center
                    p-4">
                < FiUser
                    className="text-6xl"
                />
                <h1
                    className="text-2xl font-extrabold"
                >Perfil</h1>
                </div>
            </Card>
        </div>
    )
}
