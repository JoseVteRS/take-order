import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function RestaurantLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="flex">
            <aside className="w-2/12 dark:bg-neutral-900 dark:text-white bg-neutral-50 h-screen">
                <nav className="p-5">
                    <ul className="flex flex-col items-start gap-2">
                        <li className="w-full  rounded">
                            <Link className="block p-2 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded" href="#">Restaurantes</Link>
                        </li>
                        <li className="w-full  rounded">
                            <Link className="block p-2 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded" href="#">Restaurantes</Link>
                        </li>
                        <li className="w-full  rounded">
                            <Link className="block p-2 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded" href="#">Restaurantes</Link>
                        </li>
                    </ul>
                    <Separator />
                </nav>

            </aside>
            <div className="w-10/12">
                {children}
            </div>
        </section>
    );
}