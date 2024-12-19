"use client"
import { useEffect, useState } from "react";
import {UserResponse} from "magic-dc-oauth2";
import Cookies from "js-cookie";

export default function Game() {
    const [discordUserData, setDiscordUserData] = useState<UserResponse | null>(null);

    useEffect(() => {
        const { protocol, host } = location;
        const apiUrl = `${protocol}//${host}/api/auth`;
        const encryptedToken = Cookies.get("discordToken");
        const main = async () => {
            const apiResponse = await fetch(apiUrl, {
                method: "POST",
                body: JSON.stringify({ encryptedToken })
            });

            const apiResponseDiscordUserData = await apiResponse.json();
            setDiscordUserData(apiResponseDiscordUserData);
        }

        main();
    }, [])

    if (!discordUserData) {
        return (
            <div
            className="flex flex-col items-center justify-center w-screen h-screen
            bg-zinc-950"
        >
            <h1 className="text-zinc-100 text-4xl lg:text-5xl font-extrabold"
            >Site <span className="text-zinc-950 text-stroke-sm lg:text-stroke-lg">Carregando</span>...</h1>
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
                <h1 className="text-zinc-100">{discordUserData.username}</h1>
            </div>
        </div>
    )
}