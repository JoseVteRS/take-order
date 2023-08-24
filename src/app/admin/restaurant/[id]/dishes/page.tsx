import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { normalizePrice } from "@/lib/normalize-price";
import prisma from "@/lib/prisma";
import { Category, Dishe } from "@prisma/client";
import { Pen, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { VisibilitySwitch } from "./[dishId]/active";

import { revalidatePath } from "next/cache";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";


type DishItemProps = {
  dish: {
    category: Category | null;
  } & Dishe
  params: {
    id: string,
    dishId: string
  }
}


const Dishe = ({ dish, params }: DishItemProps) => {

  return (
    <Link key={dish.id} href={`/restaurant/${params.id}/dishes/${dish.id}`}>
      <article >
        <div className="flex dishs-end justify-between gap-3 my-4">
          <div className="w-2/3">
            <span className="text-sm font-semibold">{dish.name}</span>
            <p className="text-sm text-green-700">{normalizePrice(dish.price)}{' '}€</p>
            <p className=" text-sm text-neutral-500 text">{dish.description}</p>
          </div>
          <div className="rounded-sm overflow-hidden w-[88px] h-[88px] relative">
            <Image alt="asdf" src="/pizza.jpg" height={88} width={88} className="object-cover absolute min-h-full" />
          </div>
        </div>
      </article>
    </Link>
  )
}



const DisheRow = ({ dish, params }: DishItemProps) => {
  async function deleteDish() {
    'use server'

    await prisma.dishe.deleteMany({
      where: {
        id: dish.id
      }
    })

    revalidatePath(`/admin/restaurant/${params.id}/dishes`)
    redirect(`/admin/restaurant/${params.id}/dishes`)
  }


  return (
    <TableRow>
      <TableCell className="relative h-[60px] w-[60px]">
        <div className="rounded-sm overflow-hidden w-[60px] h-[60px] relative">
          <img alt="asdf" src="/pizza.jpg" height={60} width={60} className="object-cover absolute min-h-full" />
        </div>
      </TableCell>
      <TableCell>{dish.name}</TableCell>
      <TableCell className="text">{dish.description}</TableCell>
      <TableCell>{dish.category?.name}</TableCell>
      <TableCell>{normalizePrice(dish.price)}€</TableCell>
      <TableCell className="text-center">
        <VisibilitySwitch visibility={dish.active} id={dish.id} />
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Link href={`/restaurant/${params.id}/dishes/${dish.id}/edit`}>
            <Button asChild variant="ghost" size="icon">
              <Link href={'#'}>
                <Pen size={16} />
              </Link>
            </Button>
          </Link>

          <Dialog>
            <DialogTrigger>
              <Button variant="ghost" size="icon">
                <Trash size={16} className="text-red-700" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>¿Seguro que quieres eliminar el plato?</DialogTitle>
                <DialogDescription>
                  Esta acción será permanente y no se podrá recuperar.
                  Puedes marcar el plato como oculto si no quieres que se muestre en la carta.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <form action={deleteDish}>
                  <Button type="submit" variant="destructive">Eliminar</Button>
                </form>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button asChild variant="link" size="icon">
            <Link href={`/restaurant/${params.id}/dishes/${dish.id}`}>
              Visitar
            </Link>
          </Button>

        </div>

      </TableCell>
    </TableRow>
  )
}


type Props = {
  params: {
    id: string
    dishId: string
  }
}

export default async function RestaurantDishesPage({ params }: Props) {

  const restaurant = await prisma.restaurant.findFirst({
    where: {
      id: params.id
    }
  })

  const dishes = await prisma.dishe.findMany({
    where: {
      restaurantId: params.id
    },
    include: {
      category: true
    }
  })

  const categories = await prisma.category.findMany({
    where: {
      restaurantId: params.id
    }
  })


  if (!restaurant) { return notFound() }

  return (
    <div>
      <header className="flex items-center gap-3 mb-8">
        <h2 className="text-2xl">Platos</h2>
        <Button variant="outline" asChild>
          <Link href={`/admin/restaurant/${params.id}/dishes/create`}>
            Nuevo plato
          </Link>
        </Button>
      </header>
      <div>
        <div>
          <div className="flex gap-3">

            <div>

            </div>

            <div className="w-1/2">
              <Input placeholder="Buscar plato" />
            </div>
          </div>
        </div>
        <Table>
          {/* <TableCaption>Tu platos</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[88px]"></TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead className="text-center">Ocultar/Mostrar</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              dishes.map(dish => {
                return (
                  <DisheRow key={dish.id} dish={dish} params={params} />
                )
              })
            }
          </TableBody>
        </Table>
      </div>

    </div>
  );
}