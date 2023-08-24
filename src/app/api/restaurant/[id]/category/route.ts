import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"


type Params = {
    params: {
        id: string
    }
}

export async function GET(req: NextRequest, ctx: Params) {

    try {
        const categories = await prisma.category.findMany({
            where: {
                restaurantId: ctx.params.id,
            }
        })
        return NextResponse.json({ categories, status: 200 })

    } catch (error: any) {
        console.log(error.message)

        return NextResponse.json({ message: 'Server error', status: 500 })
    }



}
