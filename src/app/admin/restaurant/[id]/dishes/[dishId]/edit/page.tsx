import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

type Param = {
    params: { id: string, dishId: string }
}

export default async function RestaurantDisheEditPage({ params }: Param) {

    const dish = await prisma.dishe.findFirst({
        where: {
            id: params.dishId,
            restaurantId: params.id
        },
    })

    const categories = await prisma.category.findMany({
        where: {
            restaurantId: params.id
        }
    })


    async function updateDishe(data: FormData) {
        'use server'
        const name = data.get('name') as string
        const description = data.get('description') as string
        const price = data.get('price') as string

        await prisma.dishe.update({
            where: {
                id: params.dishId,
                restaurantId: params.id
            },
            data: {
                name,
                description,
                price: parseFloat(price) * 100,
                active: data.get('active') === "on",
                categoryId: data.get('category') as string
            }
        })

        revalidatePath(`/admin/restaurant/${params.id}/dishes`)
        redirect(`/admin/restaurant/${params.id}/dishes`)
    }

    if (!dish) {
        return notFound()
    }

    return (
        <div className="p-5">
            <h1 className="text-xl text-center font-semibold mb-5">Editando: {dish.name}</h1>
            <div className="flex gap-8">
                <div className="border rounded-lg p-3 w-8/12" >
                    <form action={updateDishe} className="w-full" >
                        <Input type="text" className="text-xl font-semibold mb-2" name="name" defaultValue={dish.name} />
                        <Textarea className="text-lg mb-2" name="description" defaultValue={dish.description || ''} />
                        <Input type="number" className="text-lg mb-2" step={0.01} name="price" defaultValue={dish.price / 100} />
                        <Select name="category" defaultValue={dish.categoryId || ''}>
                            <SelectTrigger className="mb-2 w-full">
                                <SelectValue placeholder="Categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    categories.map(category => (
                                        <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                        <div className="flex items-center gap-3 mt-3 mb-6">
                            <p className="font-semibold">Ocultar / Mostrar</p>
                            <Switch defaultChecked={dish.active} name="active" />
                        </div>
                        <Button type="submit">Actualizar</Button>
                    </form>
                </div>

                <div className="border rounded-lg p-3 w-4/12" >
                    <form action="" className="w-full">
                        <img src="/pizza.jpg" alt="" width={250} height={250} className="rounded-lg shadow mb-5" />
                        <Input type="file" />
                        <Button>Subir imagen</Button>
                    </form>
                </div>
            </div>


        </div>
    );
}