"use client"

import { SessionProvider, SessionProviderProps } from "next-auth/react";

export default function SessionProviderWrapper({ children }: SessionProviderProps) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}