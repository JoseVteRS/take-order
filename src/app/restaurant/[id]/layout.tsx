import { GoBack } from "@/components/go-back";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";


type Props = {
    children: React.ReactNode,
    params: {
        id: string
    }
}

export default async function RestaurantLayout({
    children,
    params
}: Props) {

    const restaurantInfo = await prisma.restaurant.findFirst({
        where: {
            id: params.id
        }
    })

    if (!restaurantInfo) { return notFound() }

    return (
        <div>
            <h1 className="text-2xl text-center mb-8">{restaurantInfo.name}</h1>
            <GoBack />
            {children}
        </div>
    );
}