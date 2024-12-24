import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export default function Button({ children, onClick, className }: ComponentProps<"button">) {
    return (
        <div className="shadow-primary hover:cursor-pointer">
            <button onClick={onClick}
                className={twMerge("text-center bg-zinc-50 px-2 py-3 rounded-md hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-2 active:translate-y-2",
                    className
                )}
            >
                <p className="text-xl">{children}</p>
            </button>
        </div>
    )
}