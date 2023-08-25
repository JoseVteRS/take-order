"use client"

import { register } from "@/actions/userAction"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const RegisterPage = () => {
    const [name, setName] = useState<string>("test")
    const [email, setEmail] = useState<string>("test@test.com")
    const [password, setPassword] = useState<string>("123123")
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()


        await register({ name, email, password })

        const responseNextAuth = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        if (responseNextAuth?.error) return

        router.push("/admin")
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