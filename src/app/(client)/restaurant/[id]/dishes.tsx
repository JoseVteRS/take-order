import { Separator } from "@/components/ui/separator";
import { findAllergens } from "@/lib/find-allergents";
import { GroupedCategory } from "@/lib/group-dishes-by-category";
import { normalizePrice } from "@/lib/normalize-price";
import Image from "next/image";
import Link from "next/link";
import { DishControl } from "./dishes/dish-controls";

type Props = {
    dishes: GroupedCategory,
    restaurantId: string
}

export const Dishes = ({ dishes, restaurantId }: Props) => {
    return (
        <div className="mt-4" id={dishes.category.name} >
            <h3 id={dishes.category.name} className="font-medium text-2xl mb-2">{dishes.category.name}</h3>
            {
                dishes.items.map((dish, index) => {
                    if (!dish) return null
                    if (!dish.active) return null
                    return (
                        <Link href={`/restaurant/${restaurantId}/dishes/${dish.id}`} key={dish.id}>
                            <article className='pl-1' >
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
                                    </div>
                                </div>
                                <DishControl dish={dish} />
                            </article>

                            {
                                index !== dishes.items.length - 1 ? (<Separator className="my-3" />) : (<></>)
                            }
                        </Link>

                    )
                })
            }
        </div>
    )
}