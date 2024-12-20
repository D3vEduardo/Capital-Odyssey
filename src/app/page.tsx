"use client"

import logoVector from "@public/svg/logo-dark-icon-vector.svg";
import Button from "@/components/global/Button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if(status === "loading" || status === "unauthenticated") return;
    if(status === "authenticated") {
        router.push("/game");
    }
    
}, [session, router, status]);

  return (
    <main className="flex flex-col items-center justify-center
    gap-4 w-screen h-screen bg-zinc-950">
      <header className="flex flex-col items-center justify-center
      text-center max-w-3xl gap-2">
        <Image
          src={logoVector}
          alt="Capital Odyssey logo - Jogue agora!"
          className="w-24"
        />
        <h1 className="text-4xl lg:text-6xl
        font-extrabold text-zinc-100 text-shadow-sm
        mt-6"
        >Capital <span className="text-stroke-sm lg:text-stroke-lg">Odyssey</span></h1>
        <p
           className="text-zinc-200"
        >
          Torne-se um magnata financeiro em Capital Odyssey: conquiste o topo dos investimentos, gerencie recursos e tome decisões estratégicas. jogue agora e mostre suas habilidades!
        </p>
      </header>
      <div className="flex items-center justify-center">
      <Button
        onClick={() => signIn("discord", { callbackUrl: "/callback" })}
      >Login com Discord</Button>
      </div>
    </main>
  );
}
