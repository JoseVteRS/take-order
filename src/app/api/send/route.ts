import { VerifyEmailTemplate } from "@/components/email/templates/varify-email";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email, name, activeToken } = await req.json();

  try {
    const data = await resend.emails.send({
      from: 'TakeOrder <noreply@josevte.com>',
      to: [email],
      subject: 'Hello world',
      react: VerifyEmailTemplate({ name, email, activeToken }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}   