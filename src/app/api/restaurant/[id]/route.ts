import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    params: { id: string }
}

export async function GET(request: Request, context: Params) {
    const id = context.params.id

    const restaurant = await prisma.restaurant.findFirst({
        where: {
            id: id
        },
    })

    if (!restaurant) return NextResponse.json('Not found', { status: 404 })

    return NextResponse.json(restaurant, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    })
}


