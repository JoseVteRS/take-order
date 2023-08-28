"use client"

import { useState } from "react"
import { register } from "@/actions/userAction"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { v4 as generateUUID } from "uuid"
import { useRouter } from "next/navigation"

const RegisterPage = () => {
    const [name, setName] = useState<string>("Jose")
    const [email, setEmail] = useState<string>("jvrs.90@gmail.com")
    const [password, setPassword] = useState<string>("123123")
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!name || !email || !password) return
        const newUser = await register({ name, email, password })

        await fetch('/api/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                name,
                activeToken: newUser?.activeToken
            })
        })

        router.push("/api/auth/signin")
    }

    return (
        <div className="max-w-[400px] mx-auto">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="test"
                    name="name"
                    className="form-control mb-2"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <Input
                    type="email"
                    placeholder="test@test.com"
                    name="email"
                    className="form-control mb-2"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <Input
                    type="password"
                    placeholder="123123"
                    name="password"
                    className="form-control mb-2"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <Button
                    type="submit"
                    className="btn btn-primary"
                >
                    Register
                </Button>
            </form>
        </div>
    )
}
export default RegisterPage