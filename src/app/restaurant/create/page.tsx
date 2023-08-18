import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";


async function createRestaurant(data: FormData) {
    'use server'
    try {
        const name = data.get('name') as string
        if (!name || name === '') {
            return
        }
        await prisma.restaurant.create({
            data: {
                name
            }
        })
        redirect('/')
    } catch (error: any) {
        console.log('Error inesperado al crear un restaurante ERR_RESTAURANT_CREATE', error.message)
    }

}


export default async function RestaurantCreatePage() {
    return (
        <div >
            <h1 className="text-xl mb-3 text-center">Registra restaurante</h1>
            <div className="max-w-[200px] mx-auto">
                <form action={createRestaurant}>
                    <Input type="text" name="name" placeholder="Nombre" className="mb-3" />
                    <Button type="submit" className="w-full">Registrar</Button>
                </form>
            </div>

        </div>
    );
}