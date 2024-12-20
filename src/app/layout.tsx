import type { Metadata } from "next";
import "./globals.css";
import SessionProviderWrapper from "@/components/global/SessionProviderWrapper";

export const metadata: Metadata = {
  title: "Capital Odyssey",
  description: "Capital Odyssey é o jogo definitivo de investimentos onde você constrói sua trajetória rumo ao topo. Gerencie recursos, tome decisões estratégicas e torne-se um magnata financeiro. Jogue agora e desafie suas habilidades!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
        <html lang="pt-BR">
          <body>
            <SessionProviderWrapper>
              {children}
            </SessionProviderWrapper>
          </body>
        </html>
  );
}
