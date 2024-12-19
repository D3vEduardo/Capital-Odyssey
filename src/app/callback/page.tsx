"use client"
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Callback() {   
    const router = useRouter();
    
    const [discordToken, setDiscordToken] = useState<string | null>(null);

    useEffect(() => {
      const token = new URLSearchParams(window.location.search).get("token");
      const tokenCached = Cookies.get("discordToken");
      if (token && discordToken != token && tokenCached != token) {
        Cookies.set("discordToken", token, {expires: 1});
        setDiscordToken(token);
        setTimeout(() => {router.push("/game");}, 8000)
      }
    }, [discordToken, router]);

    if (!discordToken) {
        return (
            <div
                className="flex flex-col items-center justify-center w-screen h-screen
                bg-zinc-950"
            >
                <h1 className="text-4xl lg:text-6xl font-extrabold text-zinc-100"
                >
                    Token <span className="text-stroke-sm lg:text-stroke-lg text-zinc-950">inválido!</span>
                </h1>
                <p className="text-zinc-200"
                >Iremos te redirecionar em 8 segundos.</p>
            </div>
        )
    }

    return (
        <div
            className="flex flex-col items-center justify-center w-screen h-screen
            bg-zinc-950"
        >
            <h1 className="text-4xl lg:text-6xl font-extrabold text-zinc-100"
            >
                Logado com <span className="text-stroke-sm lg:text-stroke-lg text-zinc-950">sucesso!</span>
            </h1>
            <p className="text-zinc-200"
            >Iremos te redirecionar em 8 segundos.</p>
        </div>
    )
}