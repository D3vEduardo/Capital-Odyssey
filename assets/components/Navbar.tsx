"use client"

import { UserResponse } from "magic-dc-oauth2";
import Image from "next/image";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    const [discordUserData, setDiscordUserData] = useState<UserResponse | null>(null);

    useEffect(() => {
        const { protocol, host } = location;
        const apiUrl = `${protocol}//${host}/api/auth`;
        const encryptedToken = Cookies.get("discordToken");

        if(!encryptedToken) router.push("/");

        const main = async () => {
            const apiResponse = await fetch(apiUrl, {
                method: "POST",
                body: JSON.stringify({ encryptedToken })
            });

            const apiResponseDiscordUserData = await apiResponse.json();
            setDiscordUserData(apiResponseDiscordUserData);
        }

        main();
    }, [router]);

    if (!discordUserData) return;

    const userAvatarUrl = `https://cdn.discordapp.com/avatars/${discordUserData.id}/${discordUserData.avatar}.${discordUserData?.avatar!.startsWith("a_") ? "gif" : "png"}?size=2048`;
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
                    src={userAvatarUrl}
                    alt={`Foto de peril de ${discordUserData.username}.`}
                />
                <h1
                    className="font-medium text-xl text-zinc-200"
                >Olá,<br/><span className="font-black text-zinc-50">{discordUserData.username}</span>!
                </h1>
            </div>
            </nav>
    )
}