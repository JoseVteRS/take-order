'use client'
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    {
        label: 'Platos',
        href: '/dishes'
    },
    {
        label: 'Categorias',
        href: '/categories'
    }
]


export const NavRestaurante = ({ id }: { id: string }) => {

    return (<nav className="my-4">
        <ul className="flex items-center gap-4">
            {
                links.map(link => (
                    <li key={link.href}>
                        <Link className={cn("border rounded-full px-2 py-1 text-xs", {
                            ["bg-gray-100"]: usePathname().includes(link.href)
                        })} href={`/restaurant/${id}${link.href}`}>{link.label}</Link>
                    </li>
                ))
            }
        </ul>
    </nav>)
}