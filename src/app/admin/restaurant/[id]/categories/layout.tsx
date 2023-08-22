import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type Props = {
    children: React.ReactNode
    params: {
        id: string,
        dishId: string
    }
}

export default function RestauranteCategoriesLayout({
    children,
    params
}: Props) {

    async function createCategory(data: FormData) {
        'use server'

        await prisma.category.create({
            data: {
                name: data.get('categoryName') as string,
                description: data.get('categoryDescription') as string,
                restaurantId: params.id
            }
        })

        revalidatePath(`/restaurant/${params.id}/categories`)
    }
    return (
        <section className="px-10" >

            <h2 className="text-2xl my-8">Categorias</h2>

            <div className="flex items-start justify-between gap-8">

                <div className="w-3/12">
                    <div className="mb-10">
                        <h3 className="text-xl mb-2">Añadir nueva categoria</h3>
                        <form action={createCategory}>
                            <Input type="text" name="categoryName" placeholder="Nombre" className="mb-2" />
                            <Input type="text" name="categoryDescription" placeholder="Description" className="mb-2" />
                            <Button>Guardar Categoria</Button>
                        </form>
                    </div>
                </div>

                <div className="w-9/12">
                    {children}
                </div>
            </div>

        </section>
    );
}