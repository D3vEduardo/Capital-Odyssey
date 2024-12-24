import type { Metadata } from "next";
import "./globals.css";
import SessionProviderWrapper from "@/components/global/SessionProviderWrapper";
import "./globals.css";
import PrivateRoute from "@/components/global/PrivateRoute";

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
              <PrivateRoute>
                {children}
              </PrivateRoute>
            </SessionProviderWrapper>
          </body>
        </html>
  );
}
