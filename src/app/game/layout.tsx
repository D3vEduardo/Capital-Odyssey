import { Metadata } from "next";
import Navbar from "@assets/components/Navbar";

export const metadata: Metadata = {
    title: "Capital Odyssey - Jogue Agora!",
    description: "Capital Odyssey é o jogo definitivo de investimentos onde você constrói sua trajetória rumo ao topo. Gerencie recursos, tome decisões estratégicas e torne-se um magnata financeiro. Jogue agora e desafie suas habilidades! JOGUE AGORA!"
}

export default function GameLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-BR">
            <body>
                < Navbar />
                {children}
            </body>
        </html>
    )
}