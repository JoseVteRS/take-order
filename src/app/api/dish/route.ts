import prisma from "@/lib/prisma";
import { data } from "autoprefixer";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const { active, dishId } = await req.json()

    try {
        await prisma.dishe.update({
            where: {
                id: dishId || '',
            },
            data: {
                active: active
            }
        })

        return NextResponse.json({ message: 'TODOBIEN', status: 200 })
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: 'TODOMAL', status: 500 })
    }



    return { status: 200 }
}
