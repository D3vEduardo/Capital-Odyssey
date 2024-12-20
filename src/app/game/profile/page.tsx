"use client"
import Card from "@/components/global/Card";
import { useSession } from "next-auth/react"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { readUserData } from "./actions";
import { UserData } from "@prisma/index";

export default function Profile() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState<UserData | null>();

    useEffect(() => {
        const main = async () => {
            if (!session?.user?.email) return;
            const data = await readUserData(session.user.email);
            setUserData(data);
        };

        main()
    }, [session?.user?.email])
        
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
            className="flex items-center justify-center bg-zinc-950
            h-screen w-screen"
        >
            <Card>
                <div className="flex items-center justify-center gap-3">
                    < Image
                        src={session?.user?.image || ""}
                        alt={`Foto de perfil de ${session?.user?.name}`}
                        width={300}
                        height={300}
                        unoptimized
                        className="w-28 rounded-md border-2 border-zinc-800"
                    />
                    <div
                        className="flex flex-col items-start justify-center gap-0"
                    >
                        <p
                            className="font-extrabold text-xl"
                        >
                            @<span className="text-zinc-900">{session?.user?.name}</span>
                        </p>
                        <p
                            className="font-extrabold text-xl"
                        >
                            Id: <span className="text-zinc-900">{userData?.id}</span>
                        </p>
                    </div>
                </div>
                
            </Card>
        </div>
    )
}