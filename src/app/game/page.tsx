"use client";
import Card from "@/components/global/Card";
import { useRouter } from "next/navigation";
import UserIcon from "@public/svg/icons/profile.svg";
import Image from "next/image";

export default function Game() {

    return (
        <div
            className="flex flex-col items-center w-screen h-screen
            bg-zinc-950"
        >
            <PageCard
                iconSrc={UserIcon}
                redirectRoute="/game/profile"
                title="Meu Perfil"
            />
        </div>
    )
}

function PageCard({redirectRoute, iconSrc, title}:{
    redirectRoute: string, iconSrc: string, title: string
}) {
    const router = useRouter();
    return(
        <Card hover={true}
                className="mt-28"
                onClick={() => router.push(redirectRoute)}
            >
                <div
                    className="flex flex-col items-center justify-center
                    p-4">
                        <Image
                            src={iconSrc}
                            alt={`Ícone da rota '${redirectRoute}'`}
                            width={100}
                            height={100}
                            className="w-16"
                        />
                <h1
                    className="text-2xl font-extrabold"
                >{title}</h1>
                </div>
            </Card>
    )
}