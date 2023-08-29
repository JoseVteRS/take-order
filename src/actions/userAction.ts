'use server'
import prisma from "@/lib/prisma"
import { sha512Crypt } from "ldap-sha512"
import { signIn } from "next-auth/react";
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY);


export const findOneByEmail = async (email: string) => {
    const user = await prisma.user.findFirst({
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

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            tenant: {
                create: {}
            }
        },

    })

    return newUser
}

