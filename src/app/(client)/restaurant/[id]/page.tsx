import { Separator } from "@/components/ui/separator";
import { findAllergens } from "@/lib/find-allergents";
import { groupByCategory } from "@/lib/group-dishes-by-category";
import { normalizePrice } from "@/lib/normalize-price";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DishControl } from "./dishes/dish-controls";
import { OrderItemsStore } from "./order-items-store";

type Params = {
    params: { id: string }
}
export default async function RestaurantDishesPage({ params }: Params) {

    const dishes = await prisma.dishe.findMany({
        where: {
            restaurantId: params.id
        },
        include: {
            category: true
        },
        orderBy: {
            category: {
                name: 'asc'
            }
        }
    })

    if (dishes.length === 0) return notFound();

    const dishesGroupedByCategory = groupByCategory(dishes)



    return (
        <div className="px-3">

            {
                dishesGroupedByCategory.map(items => {
                    return (
                        <div className="mt-4" key={items.category.id}>
                            <h3 className="font-medium text-2xl mb-2">{items.category.name}</h3>
                            {
                                items.items.map((dish, index) => {
                                    if (!dish) return null
                                    if (!dish.active) return null
                                    return (
                                        <Link href={`/restaurant/${params.id}/dishes/${dish.id}`} key={dish.id}>
                                            <article className={cn('pl-1')} >
                                                <div className="flex gap-3 items-start justify-between">
                                                    <div className="flex items-start gap-3">
                                                        <div className="rounded-md overflow-hidden w-[50px] h-[50px]">
                                                            <img className="h-full w-full object-cover" src={`/pizza.jpg`} width={50} height={50} alt={`Imagen ${dish.name}`} />
                                                        </div>
                                                        <div>
                                                            <h2 className="text-sm">{dish.name}</h2>
                                                            <p className="text text-gray-400 text-sm max-w-[150px]">{dish.description}</p>

                                                            {
                                                                !(dish.allergens.length === 0) ? (
                                                                    <ul className="flex items-center gap-1 mt-1">
                                                                        {
                                                                            dish.allergens.map((allergen) => (
                                                                                <li key={findAllergens(allergen)!.id} >
                                                                                    <Image
                                                                                        src={findAllergens(allergen)!.imgSrc}
                                                                                        width={18} height={18}
                                                                                        alt={`Icono del alergeno ${findAllergens(allergen)!.label}`}
                                                                                    />
                                                                                </li>
                                                                            ))
                                                                        }

                                                                    </ul>
                                                                ) : (<></>)
                                                            }

                                                        </div>
                                                    </div>


                                                    <div className="flex flex-col gap-4 items-end justify-between">
                                                        <span>{normalizePrice(dish.price)} €</span>
                                                        <DishControl dish={dish} />
                                                    </div>
                                                </div>
                                            </article>

                                            {
                                                index !== items.items.length - 1 ? (<Separator className="my-3" />) : (<></>)
                                            }
                                        </Link>

                                    )
                                })
                            }
                        </div>
                    )
                })
            }

            <OrderItemsStore restaurantId={params.id} />
        </div>
    );
}