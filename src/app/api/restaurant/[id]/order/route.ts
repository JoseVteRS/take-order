import { GroupedItems } from "@/lib/group-order-by-category"
import prisma from "@/lib/prisma"
import { OrderItem } from "@/store/dish.store"
import { Prisma } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"


type Params = {
    params: {
        id: string
    }
}

function mapOrderForSave(order: OrderItem[]) {

    return
}

export async function POST(req: NextRequest, ctx: Params) {

    const { totalPrice, order } = await req.json()

    try {
        const categories = await prisma.order.create({
            data: {
                totalPrice,
                restaurantId: ctx.params.id,
                dishes: {
                    create: order.map((item: OrderItem) => {
                        return {
                            quantity: item.quantity,
                            dish: {
                                connect: {
                                    id: item.dish.id
                                }
                            }
                        }
                    })
                }


            }
        })
        return NextResponse.json({ categories, status: 200 })

    } catch (error: any) {
        console.log(error.message)

        return NextResponse.json({ message: 'Server error', status: 500 })
    }



}
