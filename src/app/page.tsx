import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <h1 className="text-xl">TakeOrder</h1>
      <Button variant="default" asChild><Link href='/restaurant/create'>Dar de alta mi restaurante</Link></Button>
    </main>
  )
}
