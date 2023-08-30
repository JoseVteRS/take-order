import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"


type Params = {
  params: { id: string }
}

export async function POST(req: NextRequest, ctx: Params) {
  const { name, description, price, restaurantId, active, category, allergens } = await req.json()
  const { id } = ctx.params
  try {

    const newDish = await prisma.dishe.create({
      data: {
        name: name,
        description: description,
        price: price * 100,
        categoryId: category,
        active: active,
        allergens: allergens,
        restaurantId: restaurantId,
      }
    })
    revalidatePath(`/admin/restaurant/${id}/dishes`)
    redirect(`/admin/restaurant/${id}/dishes`)
    return NextResponse.json({ newDish, status: 200 })

  } catch (error: any) {
    console.log(error.message)

    return NextResponse.json({ message: 'Server error', status: 500 })
  }
}
