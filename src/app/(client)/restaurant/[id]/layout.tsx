import { GoBack } from "@/components/go-back";
import prisma from "@/lib/prisma";
import { BadgeCheck, ShoppingBagIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

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

    if (!restaurant) notFound()

    return (
        <div>
            <header className="shadow w-full sticky container mx-auto p-2 text-neutral-900 bg-neutral-50">
                <nav className="flex items-center justify-between">

                    <GoBack  />
                    <div className="flex gap-1">
                        <h2>{restaurant.name}</h2>
                        <BadgeCheck size={16}  />
                    </div>

                    <div className="relative">
                        <ShoppingBagIcon  />
                        <span className="absolute  w-5 h-5 bg-red-600 text-white flex items-center justify-center rounded-full -top-2 -right-2 text-xs">2</span>
                    </div>
                </nav>
            </header>

            <nav className="overflow-x-scroll py-2">
                <ul className="flex space-x-4 ">
                    <li >Entrantes</li>
                    <li>Bocadillos</li>
                    <li className="active">Pizzas</li>
                    <li>Entrantes</li>
                    <li>Entrantes</li>
                    <li>Entrantes</li>
                    <li>Entrantes</li>
                    <li>Entrantes</li>
                    <li>Entrantes</li>
                </ul>
            </nav>
            {children}
        </div>
    );
}