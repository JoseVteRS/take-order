import { NavAdminAside } from "@/components/admin/restaurant/nav-aside";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";


type Props = {
    children: React.ReactNode,
    params: {
        id: string
    }
}

export default async function RestaurantItemLayout({ children, params }: Props) {

    const restaurantInfo = await prisma.restaurant.findFirst({
        where: {
            id: params.id
        }
    })

    if (!restaurantInfo) { return notFound() }

    return (
        <section className="flex">
            <aside className="min-w-[200px] dark:bg-neutral-900 dark:text-white bg-neutral-50 h-screen">
                <NavAdminAside id={params.id} />
            </aside>
            <div className="w-full">
                {children}
            </div>
        </section>
    );
}