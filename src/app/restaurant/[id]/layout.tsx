import { GoBack } from "@/components/go-back";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";


type Props = {
    children: React.ReactNode,
    params: {
        id: string
    }
}

export default async function RestaurantItemLayout({
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
        <div className="relative">
            <header className="bg-neutral-50 shadow p-2  sticky top-0 z-10" >
                <div className="flex items-center justify-center">
                    <div className="">
                        <GoBack />
                    </div>
                    <h1 className="text-2xl text-center flex-grow">{restaurantInfo.name}</h1>
                </div>
            </header>
            {children}
        </div>
    );
}