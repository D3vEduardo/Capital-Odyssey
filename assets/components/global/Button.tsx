import { ComponentProps } from "react";

export default function Button({ children, onClick }: ComponentProps<"button">) {
    return (
        <div className="shadow-primary hover:cursor-pointer">
            <button onClick={onClick}
                className="text-center bg-zinc-50
                px-2 py-3 rounded-md
                hover:translate-x-0.5 hover:translate-y-0.5
                active:translate-x-2 active:translate-y-2"
            >
                <p className="text-xl">{children}</p>
            </button>
        </div>
    )
}