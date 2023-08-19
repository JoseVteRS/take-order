import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {

  return { status: 200, body: "Hello World" }
}


