import { Dispatch, SetStateAction } from "react";

export interface iUserData {
    email: string;
    id: string;
    bal: number;
}

export interface iUserContext extends iUserData {
    setUserData: Dispatch<SetStateAction<iUserData>>;
}