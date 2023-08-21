'use client'
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div>
      <h1>Inicia sessión</h1>
      <Button onClick={() => signIn("google")} >
        Inicia session con Google
      </Button>
    </div>
  );
}