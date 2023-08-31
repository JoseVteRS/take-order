import { GoBack } from "@/components/go-back";
import prisma from "@/lib/prisma";
import { BadgeCheck, ShoppingBagIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { CategoryNavbarItem } from "./category-navbar-item";
import { OrderQuantityStore } from "./order-quantity-store";

type Params = {
    id: string,
    children: ReactNode
}

export default async function RestaurantDishLayout({
    children,
    id
}: Params) {

    const restaurant = await prisma.restaurant.findFirst({
        where: {
            id: id
        }
    })

    const categories = await prisma.category.findMany({
        where: {
            restaurantId: id
        }
    })

    if (!restaurant) notFound()

    return (
        <div className="relative">
            <header className="shadow w-full sticky top-0 container mx-auto p-2 text-neutral-900 bg-neutral-50 ">
                <nav className="flex items-center justify-between">

                    <GoBack />
                    <div className="flex gap-1">
                        <h2>{restaurant.name}</h2>
                        <BadgeCheck size={16} />
                    </div>

                    <div className="relative">
                        <ShoppingBagIcon />
                        <OrderQuantityStore />
                    </div>
                </nav>
            </header>

            <nav className="overflow-x-scroll py-2 sticky top-[39px] bg-white">
                <ul className="flex space-x-4 ">
                    {
                        categories.map((category) => (
                            <CategoryNavbarItem category={category} />
                        ))
                    }
                </ul>
            </nav>
            {children}
        </div>
    );
}