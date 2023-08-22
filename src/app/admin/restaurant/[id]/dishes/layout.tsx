import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";
import { revalidatePath } from "next/cache";



type Props = {
  params: {
    id: string
  }
  children: React.ReactNode
}



const Aside = ({ id, categories }: { id: string, categories: Category[] }) => {

  async function createDishe(data: FormData) {
    'use server'

    const price = data.get('price') as string
    const parsePrice = parseFloat(price)
    const category = data.get('category') as string

    await prisma.dishe.create({
      data: {
        name: data.get('name') as string,
        description: data.get('description') as string,
        price: (parsePrice * 100),
        restaurantId: id,
        categoryId: category
      }
    })

    revalidatePath(`/restaurant/${id}/dishes`)
  }


  async function createCategory(data: FormData) {
    'use server'

    await prisma.category.create({
      data: {
        name: data.get('categoryName') as string,
        description: data.get('categoryDescription') as string,
        restaurantId: id
      }
    })

    revalidatePath(`/restaurant/${id}/dishes`)
  }


  return (
    <>
      <div className="mb-10">
        <h3 className="text-xl mb-2">Añadir plato</h3>
        <form action={createDishe}>
          <input type="hidden" name="id" />
          <Input type="text" name="name" placeholder="Nombre del palto" className="mb-2" />
          <Input type="text" name="description" placeholder="Description breve del plato" className="mb-2" />
          <Input type="number" step={0.01} min={0} name="price" placeholder="Precio" className="mb-2" />

          <Select name="category">
            <SelectTrigger className="mb-2 w-full">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              {
                categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>

          <Button>Guardar Plato</Button>
        </form>
      </div>

      <div className="mb-10">
        <h3 className="text-xl mb-2">Añadir categoria</h3>
        <form action={createCategory}>
          <Input type="text" name="categoryName" placeholder="Nombre" className="mb-2" />
          <Input type="text" name="categoryDescription" placeholder="Description" className="mb-2" />

          <Button>Guardar Categoria</Button>
        </form>
      </div>
    </>
  )
}



export default async function RestaurantDishesLayout({ children, params }: Props) {

  const categories = await prisma.category.findMany({
    where: {
      restaurantId: params.id
    }
  })

  return (
    <section className="my-10 mx-5" >
      <header className="flex items-center gap-3">
        <h2 className="text-2xl">Platos</h2>
        <Button variant="outline">Nuevo plato</Button>
      </header>

      <div className="flex items-start justify-between gap-8">

        <div className="w-10/12">
          {children}
        </div>

        <div className="w-2/12">
          <Aside id={params.id} categories={categories} />
        </div>
      </div>

    </section>
  );
}