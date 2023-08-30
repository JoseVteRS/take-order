import { Separator } from "@/components/ui/separator";
import { findAllergens } from "@/lib/find-allergents";
import { normalizePrice } from "@/lib/normalize-price";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { Dishe } from "@prisma/client";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = {
    params: { id: string }
}
export default async function RestaurantDishesPage({ params }: Params) {

    const dishes = await prisma.dishe.findMany({
        where: {
            restaurantId: params.id
        }
    })

    if (dishes.length === 0) return notFound();


    return (
        <div className="px-3">
            <h3 className="font-bold text-lg">Pizzas</h3>

            <div className="mt-5">
                {
                    dishes.map((dish: Dishe, index) => (

                        <Link href={`/restaurant/${params.id}/dishes/${dish.id}`} key={dish.id}>
                            <article className={cn('pl-1', {
                                ['border-l-2 pl-1 border-sky-400']: index % 2 === 0
                            })} >
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
                                        <button className="bg-sky-100 text-sky-800 w-5 h-5 rounded-full flex items-center justify-center">
                                            <Plus size={12} />
                                        </button>
                                    </div>
                                </div>
                            </article>

                            <Separator className="my-2" />
                        </Link>
                    ))
                }

            </div>
        </div>
    );
}