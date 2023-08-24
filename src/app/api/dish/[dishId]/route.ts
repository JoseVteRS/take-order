import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";


type Params = {
    params: {
        dishId: string
    }
}

export async function DELETE(req: NextRequest, ctx: Params) {

    const dishId = ctx.params.dishId

    console.log(dishId)
    // return NextResponse.json(dishId, { status: 200 })
    try {

        console.log(dishId)

        const response = await prisma.dishe.delete({
            where: {
                id: dishId
            }
        })

        revalidatePath('/api/restaurant/[id]/dishes')
        return NextResponse.json(response, { status: 200 })
    } catch (error: any) {
        return NextResponse.json(error.message, { status: 500 })
    }
}