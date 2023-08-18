import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import prisma from "@/lib/prisma";

type Props = {
  params: {
    id: string
  }
}

export default async function RestaurantCategoriesPage({ params }: Props) {

  async function createCategory(data: FormData) {
    'use server'

    await prisma.category.create({
      data: {
        name: data.get('name') as string,
        description: data.get('description') as string,
        restaurantId: params.id,
      }
    })
  }

  return (
    <div className="p-5" >
      <h1 className="text-2xl text-center mb-5">Categirias</h1>
      <form action={createCategory}>
        <Input className="mb-3" type="text" name="name" placeholder="Nombre" />
        <Input className="mb-3" type="text" name="name" placeholder="Descripción" />
        <Button type="submit" className="w-full">Guardar</Button>
      </form>
    </div>
  );
}