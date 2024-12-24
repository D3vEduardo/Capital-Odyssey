import { Metadata } from "next";
import Navbar from "@/components/game/Navbar";
import SessionProviderWrapper from "@/components/global/SessionProviderWrapper";
import UserContextProvider from "@assets/contexts/UserDataContextProvider";
import PrivateRoute from "@/components/global/PrivateRoute";

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
                <SessionProviderWrapper>
                    <UserContextProvider>
                        <PrivateRoute >
                            < Navbar />
                            {children}
                        </PrivateRoute>
                    </UserContextProvider>
                </SessionProviderWrapper>
            </body>
        </html>
    )
}