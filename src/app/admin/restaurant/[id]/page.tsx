import { QRCode } from "@/components/qr-code";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";




type Props = {
    params: {
        id: string
    }
}

export default async function RestaurantDetailPage({ params }: Props) {

    const dishes = await prisma.dishe.findMany({
        where: {
            restaurantId: params.id
        }
    })

    const categories = await prisma.category.findMany({
        where: {
            restaurantId: params.id
        }
    })

    if (!dishes) { return notFound() }


    return (
        <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="border rounded p-4">
                    <div className="flex items-center gap-2 justify-around">
                        <span className="block font-bold text-lg">Platos</span>
                        <p className="text-xl">{dishes.length}</p>
                    </div>
                    <Button asChild className="w-full mt-2" variant="outline">
                        <Link href={`http://localhost:3000/restaurant/${params.id}/dishes`}>Crear Plato</Link>
                    </Button>
                </div>

                <div className="border rounded p-4" >
                    <div className="flex items-center gap-2 justify-around">
                        <span className="block font-bold text-lg">Categorias</span>
                        <p className="text-xl">{categories.length}</p>
                    </div>
                    <Button asChild className="w-full mt-2" variant="outline">
                        <Link href={`http://localhost:3000/restaurant/${params.id}/categories`}>Crear Categoria</Link>
                    </Button>
                </div>

                <div className="border rounded p-4" >
                    <span className="block font-bold text-lg">Código QR</span>
                    <QRCode url={`http://localhost:3000/restaurant/${params.id}`} />
                    <Button asChild className="w-full mt-2" variant="outline">
                        <Link href={`http://localhost:3000/restaurant/${params.id}/categories`}>Crear Categoria</Link>
                    </Button>
                </div>

                <div>
                   
                </div>
            </div>

        </div>
    );
}