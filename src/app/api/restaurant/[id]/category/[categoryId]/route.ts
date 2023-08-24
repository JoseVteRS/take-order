import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(req: NextRequest, ctx: Params) {
    try {
        const { id, categoryId } = ctx.params

        const response = await prisma.category.delete({
            where: {
                id: categoryId,
                restaurantId: id
            }
        })
        revalidatePath(`/admin/restaurant/${id}/categories`)
        return NextResponse.json(response, { status: 200 })
    } catch (error: any) {
        return NextResponse.json(error.message, { status: 500 })
    }
}