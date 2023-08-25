"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export const ButtonLogout = () => {
    return (
        <Button onClick={() => signOut({
            redirect: true,
            callbackUrl: '/api/auth/signin'
        })}>
            Salir
        </Button>
    )
}