"use client"
export default function Callback() {

    return (
        <div
            className="flex flex-col items-center justify-center w-screen h-screen
            bg-zinc-950"
        >
            <h1 className="text-4xl lg:text-6xl font-extrabold text-zinc-100"
            >
                Logado com <span className="text-stroke-sm lg:text-stroke-lg text-zinc-950">sucesso!</span>
            </h1>
            <p className="text-zinc-200"
            >Iremos te redirecionar em 5 segundos.</p>
        </div>
    )
}