"use client"

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PrivateRoute({ children }: {children: ReactNode}) {
    const pathname = usePathname();
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated" && pathname.startsWith("/game")) {
            router.push("/")
        }
        if (status === "authenticated" && !pathname.startsWith("/game")) {
            router.push("/game")
        }
    }, [pathname, router, status]);

    if (status === "loading") {
        return (
                <div
                    className="flex justify-center items-center w-screen h-screen
                    bg-zinc-950 absolute left-0 top-0"
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

    return <>{children}</>;
}