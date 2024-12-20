"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ClientRedirect() {
    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {router.push("/")}, 8000);
    }, [router]);

    return <></>;
}