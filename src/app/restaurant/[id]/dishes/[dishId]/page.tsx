import { Counter } from "@/components/counter"
import { normalizePrice } from "@/lib/normalize-price"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"


type Props = {
    params: {
        id: string
        dishId: string
    }
}

export default async function RestaurantDishDetailPage({ params }: Props) {

    const dish = await prisma.dishe.findFirst({
        where: {
            id: params.dishId,
            restaurantId: params.id
        }
    })

    if (!dish) {
        return notFound()
    }

    return (
        <section className="h-[55vh]">
            <header className="relative min-h-[150px]">
                <img src="/pizza.jpg" alt="pizza" className="w-full object-cover min-h-[150px]" />
            </header>

            <div className="px-2 flex flex-col justify-between h-full">
                <div>
                    <h1 className="font-bold text-xl">{dish?.name}</h1>
                    <p className="font-semibold text-xl">{normalizePrice(dish.price)}{' '}€</p>
                    <p className="text-neutral-600 text-sm">{dish.description}</p>
                </div>


                <div className="mt-4">
                    <Counter price={dish.price} />
                </div>
            </div>



        </section>
    );
}