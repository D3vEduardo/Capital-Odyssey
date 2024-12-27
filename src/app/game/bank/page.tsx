"use client"

import UserBal from "@/components/game/UserBal";
import Button from "@/components/global/Button";
import EyeOn from "@public/svg/icons/openon.svg";
import EyeOff from "@public/svg/icons/openoff.svg";
import { Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import Image from "next/image";
import Modal, { ModalInput } from "@/components/game/Modal";
import GameLogo from "@public/svg/logo-dark-icon-vector.svg";
import { UserContext } from "@assets/contexts/UserDataContext";
import { useSession } from "next-auth/react";
import { TransferBal } from "./actions";
import { iUserContext } from "@assets/types/UserData/types";

const ReturnEye = {
    EyeOn,
    EyeOff
}

export default function Bank() {
    const [showBal, setShowBal] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const userData = useContext(UserContext);
    const { data: session } = useSession();
    const addresseeInput = useRef<HTMLInputElement | null>(null);
    const transferValueInput = useRef<HTMLInputElement | null>(null);
    return (
        <div
            className="w-screen h-screen bg-zinc-950 flex flex-col
            items-center justify-center"
        >
            {showModal && (
                <Modal
                title="Transferir Saldo"
                setShowModal={setShowModal}
                onSubmitAction={() => {
                    const value = transferValueInput.current?.valueAsNumber;
                    const addressee = addresseeInput.current?.value;

                    if (!value || !addressee) return;

                    TransferBalSubmit(value,
                        userData.email, addressee,
                        setShowModal, userData
                    )
                }}>
                    <ModalInput ref={addresseeInput} placeholder="Destinatário:" type="text"/>
                    <ModalInput ref={transferValueInput} placeholder="Valor:" type="number"/>
                </Modal>
            )}
            <section
                className="flex flex-col items-center justify-center gap-4"
            >
                <figure
                    className="bg-zinc-800 w-full h-32 rounded-lg relative"
                >
                    <Image
                        src={GameLogo}
                        alt="Logo da Capital Odyssey"
                        width={40}
                        height={40}
                        className="absolute top-2 left-2"
                    />
                    <p
                        className="absolute bottom-6 left-2
                        text-zinc-200 font-semibold"
                    >
                        {session?.user?.name}
                    </p>
                    <p
                        className="absolute bottom-2 left-2
                        text-zinc-400 font-medium"
                    >
                        {userData.balCard}
                    </p>
                </figure>
                <div
                    className="flex items-center justify-center gap-x-4"
                >
                    <UserBal
                        showBal={showBal}
                        setShowBal={setShowBal}
                    />
                    <Button className="p-1">
                        <Image
                            alt="Mostrar ou ocultar saldo"
                            width={100}
                            height={100}
                            src={showBal ? ReturnEye.EyeOff : ReturnEye.EyeOn}
                            onClick={() => {
                                setShowBal(prev => !prev)
                            }}
                            className="w-8"
                        />
                    </Button>
                </div>
                <div className="w-full">
                    <Button
                        onClick={() => setShowModal(true)}
                        className="w-full"
                    >
                        Transferir saldo
                    </Button>
                </div>
            </section>
        </div>
    )
}

async function TransferBalSubmit(
value: number, remettigEmail: string,
addressee: string, setShowModal: Dispatch<SetStateAction<boolean>>,
userCtx: iUserContext)
{
    setShowModal(false);
    const response = await TransferBal(addressee, remettigEmail, value);
    if (response.responseType === "error" || !response.remettingData) {
        console.log(response.message);
        return;
    }
    userCtx.setUserData(response.remettingData);
}