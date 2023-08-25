'use server'
import prisma from "@/lib/prisma"
import { sha512Crypt } from "ldap-sha512"

export const findOneByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    return user
}


type RegisterData = {
    name: string
    email: string
    password: string
}

export const register = async (data: RegisterData) => {
    const { email, name, password } = data

    const existsUser = await findOneByEmail(email)
    if (existsUser) return

    const hashedPassword = await sha512Crypt(password, '10')

    console.log(data);
    const newUser = await prisma.user.upsert({
        where: {
            email: email
        },
        create: {
            name,
            email,
            password: hashedPassword,
            tenant: {
                create: {}
            }
        },
        update: {
            name,
            email
        }
    })

    return newUser
}

