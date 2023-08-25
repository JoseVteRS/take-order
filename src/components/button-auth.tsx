"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"

export default function ButtonAuth() {
    const { data: session, status } = useSession()

    if (status === "loading") return (<p>Loading...</p>)

    if (session) {
        return (
            <>
                <p>Signed in as {session.user.email}</p>
                <div>
                    <Button
                        onClick={() => signOut()}
                    >
                        Salir
                    </Button>
                </div>
            </>
        )
    }


    return (
        <div>
            <p>Not signed in</p>
            <div>
                <Button onClick={() => signIn()}>
                    Entrar
                </Button>
            </div>
        </div>
    )
}