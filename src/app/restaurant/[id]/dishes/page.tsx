import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { normalizePrice } from "@/lib/normalize-price";
import prisma from "@/lib/prisma";
import { Category, Dishe } from "@prisma/client";
import { Pen, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VisibilitySwitch } from "./[dishId]/active";



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
  async function changeVisibilityDish(data: FormData) {
    'use server'
    await prisma.dishe.update({
      where: {
        id: data.get('dish-id') as string
      },
      data: {
        active: (data.get('active') === "on")
      }
    })
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
            <Pen size={16} />
          </Link>
          <button className="text-red-500">
            <Trash size={16} />
          </button>
          <Link href={`/restaurant/${params.id}/dishes/${dish.id}`}>
            Visitar
          </Link>
        </div>

      </TableCell>
    </TableRow>
  )
}


type Props = {
  params: {
    id: string
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

  if (!restaurant) { return notFound() }

  return (
    <div>
      <div>
        <Table>
          <TableCaption>Tu platos</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[88px]"></TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead className="text-center">Ocultar/Mostrar</TableHead>
              <TableHead></TableHead>
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