import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";
import { revalidatePath } from "next/cache";
import Link from "next/link";



type Props = {
  params: {
    id: string
  }
  children: React.ReactNode
}






export default async function RestaurantDishesLayout({ children, params }: Props) {

  const categories = await prisma.category.findMany({
    where: {
      restaurantId: params.id
    }
  })

  return (
    <section className="my-10 mx-5" >


      <div className="">
        <div className="">
          {children}
        </div>
      </div>

    </section>
  );
}