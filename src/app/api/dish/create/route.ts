import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
  const { name, description, price, restaurantId, active, category } = await req.json()

  try {

    const newDish = await prisma.dishe.create({
      data: {
        name: name,
        description: description,
        price: price * 100,
        categoryId: category,
        active: active,
        restaurantId: restaurantId,
      }
    })
    revalidatePath('/admin/restaurant/[id]/dishes')



    return NextResponse.json({ newDish, status: 200 })

  } catch (error: any) {
    console.log(error.message)

    return NextResponse.json({ message: 'Server error', status: 500 })
  }



}
