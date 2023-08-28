import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const activeToken = searchParams.get('token')

  if (!activeToken) return NextResponse.json({ message: 'Token not found' }, { status: 404 })

  const user = await prisma.user.findFirst({
    where: {
      activeToken: activeToken
    }
  })

  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 })

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      activeToken: null,
      active: true
    }
  })

  return NextResponse.redirect('http://localhost:3000/api/auth/signin')
}