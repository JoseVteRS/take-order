import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { verifySha512 } from "ldap-sha512"

export async function POST(req: NextRequest) {
    const { email, password } = await req.json()

    const user = await prisma.user.findFirst({
        where: {
            email: email
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
        }
    })
    if (!user?.password) return
    const hashedPassword = await verifySha512(password, user.password)




    if (user && hashedPassword) {
        const userWithoutPassword = { ...user, password: undefined }
        console.log('user from user/check-crendentials', user)
        return NextResponse.json(userWithoutPassword, { status: 200 })
    } else {
        return NextResponse.json("Invalid credentials", { status: 500 })
    }

}