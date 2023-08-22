'use client'

import { Separator } from "@/components/ui/separator"
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

    return (
        <nav className="p-1">
            <ul className="flex flex-col items-start gap-1">
                {
                    links.map(link => (
                        <li className="w-full  rounded">
                            <Link className={
                                cn("block p-2 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded",
                                    { ["bg-neutral-200"]: path.includes(link.href) })
                            }
                                href={`/admin/restaurant/${id}${link.href}`}>{link.label}</Link>
                        </li>
                    ))
                }
            </ul>
            <Separator />
        </nav>

    )
}