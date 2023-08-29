import prisma from "@/lib/prisma";
import { Dishe } from "@prisma/client";
import { notFound } from "next/navigation";

type Params = {
    id: string
}
export default async function RestaurantDishesPage({ id }: Params) {


    const dishes = await prisma.dishe.findMany({
        where: {
            restaurantId: 'asdf'
        }
    })

    if ( dishes.length === 0) return notFound();

    console.log(dishes)

    return (
        <div>
            <h3 className="font-bold text-lg">Pizzas</h3>

            <div>
                {
                    dishes.map((dish: Dishe) => (
                        <article key={dish.id}>
                            <h2>{dish.name}</h2>
                        </article>
                    ))
                }

            </div>
        </div>
    );
}