import { groupByCategory } from "@/lib/group-dishes-by-category";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { DishesScrollSpy } from "./dishes-scroll-spy";
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

            <DishesScrollSpy dishesGroupedByCategory={dishesGroupedByCategory} restaurantId={params.id} />

            <OrderItemsStore restaurantId={params.id} />
        </div>
    );
}