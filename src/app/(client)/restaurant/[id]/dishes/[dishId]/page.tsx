import { normalizePrice } from "@/lib/normalize-price"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"



type Params = {
  params: {
    id: string
    dishId: string
  }
}


export default async function RestaurantDishDetailPage({ params }: Params) {

  const dish = await prisma.dishe.findFirst({
    where: {
      id: params.dishId
    },
    include: {
      category: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })

  if (!dish) return notFound()

  return (
    <div>
      <div className="w-[66vh]">
        <img src="/pizza.jpg" alt="Imagen pizza" className="object-cover" />
      </div>
      <div className="px-5">
        <h3 className="text-lg font-semibold">{dish.name}</h3>
        <span className="text-lg">{normalizePrice(dish.price)} €</span>
        <div className="text-md text-neutral-400">
          {dish.description}
        </div>
      </div>
    </div>
  );
}