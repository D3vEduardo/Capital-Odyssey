"use client"

import { ComponentProps } from "react"

type Props = ComponentProps<"figure">

export default function Card({ children }: Props) {
    return (
        <figure className="items-center justify-center
        bg-zinc-100 text-zinc-950 px-2 py-1 w-auto"
        >
            {children}
        </figure>
    )
}