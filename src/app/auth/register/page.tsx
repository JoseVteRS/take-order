import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUserSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { sha512Crypt } from 'ldap-sha512';
import { redirect } from "next/navigation";

export default async function AuthRegisterPage() {

    const user = await getUserSession()
    
    if(!user) redirect('/')

    async function registerUser(data: FormData) {
        "use server"

        if (!data) throw new Error('Nombre, Correo electrónico y Contraseña son necesarios')

        const user = await prisma.user.findUnique({
            where: {
                email: data.get('email') as string
            }
        })

        if (user) throw new Error('Usuario ya existe')

        const password = data.get('password') as string
        const encryptedPassword = await sha512Crypt(password, '10')

        await prisma.user.create({
            data: {
                name: data.get('name') as string,
                email: data.get('email') as string,
                password: encryptedPassword,

                tenant: {
                    create: {
                        name: data.get('name') as string,
                    }
                }
            },
        })

        redirect('/api/auth/signin')

    }

    return (
        <div className="p-5 mx-auto w-full">
            <h1 className="text-3xl mb-5 text-center">Regístrate</h1>
            <div className="max-w-[500px] mx-auto">
                <form action={registerUser}>
                    <Input className="mb-3" type="text" name="name" placeholder="Nombre" />
                    <Input className="mb-3" type="email" name="email" placeholder="Correo electrónico" />
                    <Input className="mb-3" type="password" name="password" placeholder="Contraseña" />
                    <Button type="submit">Registrarme</Button>
                </form>
            </div>
        </div>
    );
}