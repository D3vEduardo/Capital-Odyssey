"use client"

import { iUserData } from "@assets/types/UserData/types";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";
import { UserContext } from "./UserDataContext";
import { useRouter } from "next/navigation";
import { readUserData } from "./UserDataContextActions";

interface iProps {
    children: ReactNode;
}

export default function UserContextProvider({ children }: iProps) {
    const router = useRouter();
    const [userData, setUserData] = useState<iUserData>({
      email: "",
      id: "",
      bal: 0,
    });
    const { data: session, status } = useSession();
  
    useEffect(() => {
      const main = async () => {
        if (status === "loading") return;
        if (status === "unauthenticated") router.push("/");
        if (session?.user?.email) {
            const data = await readUserData(session.user.email);
            setUserData(data);
            return;
        }

        throw Error("Nenhum dado foi recebido da autenticação!")
      }
  
      main()
    }, [status, router, session?.user?.email])
  
    return (
      <UserContext.Provider value={{ ...userData, setUserData }}>
        {children}
      </UserContext.Provider>
    )
  }