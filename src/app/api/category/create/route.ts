import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
  const { name, restaurantId, } = await req.json()

 


  try {

    const newCategory = await prisma.category.create({
      data: {
        name: name,
        restaurantId: restaurantId,
      }
    })
    revalidatePath('/admin/restaurant/[id]/dishes')

    return NextResponse.json({ newCategory, status: 200 })

  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json({ message: 'Server error', status: 500 })
  }



}
