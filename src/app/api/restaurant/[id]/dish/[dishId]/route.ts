import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";


type Params = {
    params: {
        id: string
        dishId: string
    }
}


export async function PUT(req: NextRequest, ctx: Params) {
    const { active, dishId } = await req.json()

    try {
        const { id, dishId } = ctx.params

        const response = await prisma.dishe.update({
            where: {
                id: dishId,
                restaurantId: id
            },
            data: {
                active
            }
        })
        revalidatePath(`/admin/restaurant/${id}/dishes`)
        return NextResponse.json(response, { status: 200 })

    } catch (error: any) {
        return NextResponse.json(error.message, { status: 500 })
    }
}

export async function DELETE(req: NextRequest, ctx: Params) {
    try {
        const { id, dishId } = ctx.params

        const response = await prisma.dishe.delete({
            where: {
                id: dishId,
                restaurantId: id
            }
        })
        revalidatePath(`/admin/restaurant/${id}/dishes`)
        return NextResponse.json(response, { status: 200 })
    } catch (error: any) {
        return NextResponse.json(error.message, { status: 500 })
    }
}