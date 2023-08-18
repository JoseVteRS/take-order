import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { normalizePrice } from "@/lib/normalize-price";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";



const NoDishes = () => {
  return (
    <div className="bg-neutral-200 w-full rounded p-3 text-center">
      <h2>Todavía no has creado ningun platos para tu carta </h2>
      <p className="text-sm">Crea una haciendo click en el botón de abajo</p>
      <Button className="mt-2">Crear plato</Button>
    </div>
  )
}


type Props = {
  params: {
    id: string
  }
}

export default async function RestaurantDishesPage({ params }: Props) {

  const restaurant = await prisma.restaurant.findFirst({
    where: {
      id: params.id
    }
  })

  const dishes = await prisma.dishe.findMany({
    where: {
      restaurantId: params.id
    }
  })

  if (!restaurant) { return notFound() }

  async function createDishe(data: FormData) {
    'use server'

    const price = data.get('price') as string
    const parsePrice = parseFloat(price)

    await prisma.dishe.create({
      data: {
        name: data.get('name') as string,
        description: data.get('description') as string,
        price: (parsePrice * 100),
        restaurantId: params.id
      }
    })

    revalidatePath(`/restaurant/${params.id}/dishes`)

  }

  return (
    <div className="px-5">

      <form action={createDishe}>
        <input type="hidden" name="id" />
        <Input type="text" name="name" placeholder="Nombre del palto" className="mb-2" />
        <Input type="text" name="description" placeholder="Description breve del plato" className="mb-2" />
        <Input type="number" step={0.01} min={0} name="price" placeholder="Precio" className="mb-2" />
        <Button>Guardar Plato</Button>
      </form>

      <div className="mt-10 max-w-full mx-auto">
        <h2>Platos</h2>
        {
          dishes.map(dish => (
            <Link key={dish.id} href={`/restaurant/${params.id}/dishes/${dish.id}`}>
            <article >
              <div className="flex items-end justify-between gap-3 my-4">
                <div className="w-2/3">
                  <span className="text-sm font-semibold">{dish.name}</span>
                  <p className="text-sm text-green-700">{normalizePrice(dish.price)}{' '}€</p>
                  <p className=" text-sm text-neutral-500 text">{dish.description}</p>
                </div>
                <div className="rounded-sm overflow-hidden w-[88px] h-[88px] relative">
                  <img alt="asdf" src="/pizza.jpg" height={88} width={88} className="object-cover absolute min-h-full" />
                </div>
              </div>
            </article>
            </Link>
          ))
        }
      </div>
    </div>
  );
}