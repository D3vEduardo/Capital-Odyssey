"use client"
import { iUserContext } from "@assets/types/UserData/types";
import { createContext } from "react";

export const UserContext = createContext<iUserContext>({
    email: "",
    id: "",
    bal: 0,
    setUserData() {
        throw Error("setUserData foi chamado fora de um UserContext.Provider")
    },
});

