'use client'

import { Separator } from "@/components/ui/separator"
import { useRestaurant } from "@/hooks/use-restaurant"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
    {
        label: 'Platos',
        href: '/dishes'
    },
    {
        label: 'Categorias',
        href: '/categories'
    },
    {
        label: 'Métricas',
        href: '/metrics'
    }
]

export const NavAdminAside = ({ id }: { id: string }) => {
    const path = usePathname()
    const { loading, restaurant } = useRestaurant(id)


    return (
        <nav className="p-1">
            <div className="mt-2">
                <h2 className="font-bold text-lg text-neutral-900" >{restaurant?.name ? restaurant.name : 'Restaurante'}</h2>
            </div>
            <Separator className="my-5" />
            <ul className="flex flex-col items-start gap-1">
                {
                    links.map(link => (
                        <li key={link.href} className="w-full rounded">
                            <Link className={
                                cn("block p-2 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded",
                                    { ["bg-neutral-200"]: path.includes(link.href) })
                            }
                                href={`/admin/restaurant/${id}${link.href}`}>{link.label}</Link>
                        </li>
                    ))
                }
            </ul>
            <Separator className="my-5" />
        </nav>

    )
}