"use client"

import { usePathname, useRouter } from "next/navigation";
import UserIcon from "@public/svg/icons/profile.svg";
import HomeIcon from "@public/svg/icons/home.svg"
import CifraoIcon from "@public/svg/icons/cifrao.svg";
import Image from "next/image";

export default function Navbar() {
    const pathname = usePathname();
    if (pathname === "/gameh") return;
    return (
        <nav
            className="flex items-center justify-center bg-zinc-200
            absolute bottom-0 left-0 lg:left-1/2 lg:-translate-x-1/2
            w-screen lg:w-auto lg:max-w-96 md:max-w-96 sm:max-w-max
            py-2 lg:px-5 gap-2 rounded-t-xl"
        >
            <NavIcon
                text="Perfil"
                icon={UserIcon}
                redirectRoute="/game/profile"
            />
            <NavIcon
                text="Home"
                icon={HomeIcon}
                redirectRoute="/game"
            />
            <NavIcon
                text="Banco"
                icon={CifraoIcon}
                redirectRoute="/game/bank"
                className="-ml-1"
            />
        </nav>
    )
}

function NavIcon({ icon,  redirectRoute, className, text}:
{icon: string, redirectRoute: string, className?:string, text: string}) {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <span
            className="hover:cursor-pointer flex flex-col items-center justify-center"
            onClick={() => router.push(redirectRoute)}
        >
            <Image
                src={icon}
                alt={`Ícone da rota ${redirectRoute}`}
                width={100}
                height={100}
                className={`w-14 lg:w-12 rounded-lg ${className}
                    ${redirectRoute === pathname&&"bg-zinc-400"}`}
            />
            <p
                className="text-zinc-950"
            >
                {text}
            </p>
        </span>
    )
}