import { ComponentProps, ReactNode } from "react";
import Button from "../global/Button";
import Card from "../global/Card";

export default function Modal(props: {title: string, children: ReactNode, setShowModal: (value: boolean) => void, onSubmitAction: () => void | Promise<void>}) {
    return (
        <span className="bg-zinc-950 p-10 flex flex-col items-center
                justify-center gap-4 absolute left-1/2 bottom-1/2
                -translate-x-1/2 translate-y-1/2 z-20
                rounded-lg border-2 border-white">
                <p
                className="text-zinc-100 text-4xl font-extrabold"
            >
                {props.title}
            </p>
            <div className="flex w-full gap-4">
                {props.children}
            </div>
            <section
                className="flex justify-between items-center w-full"
            >
                <Button onClick={()=>props.setShowModal(false)}>
                    Fechar
                </Button>
                <Button
                    onClick={() => props.onSubmitAction()}
                >
                    Concluir
                </Button>
            </section>
        </span>
    )
}

export function ModalInput(props: ComponentProps<"input">) {
    return (
        <Card>
            <div className="w-full h-full p-0 m-0 g-0">
                <input
                    {...props}
                    className="w-full h-full text-zinc-900 bg-zinc-100
                    outline-none"
                />
            </div>
        </Card>
    )
}