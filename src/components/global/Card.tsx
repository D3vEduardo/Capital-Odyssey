"use client"

import { ComponentProps } from "react"

type Props = ComponentProps<"figure"> & {
    hover?: boolean;
}

export default function Card({ children, className, hover, onClick }: Props) {
    return (
        <figure onClick={onClick} className={`shadow-primary ${className} ${hover && "hover:cursor-pointer"}`}
        >
                <div className={`items-center justify-center
                    bg-zinc-100 text-zinc-950 px-2 py-2 rounded
                    ${hover && "hover:translate-y-0.5 hover:translate-x-0.5 active:translate-x-2 active:translate-y-2"}`}>
                {children}
                </div>
        </figure> 
    )
}