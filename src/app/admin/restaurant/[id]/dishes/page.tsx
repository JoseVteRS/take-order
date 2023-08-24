
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { normalizePrice } from "@/lib/normalize-price";
import prisma from "@/lib/prisma";
import { Category, Dishe } from "@prisma/client";
import { Pen } from "lucide-react";
import Link from "next/link";
import { VisibilitySwitch } from "./[dishId]/active";

import { AlertDelete } from "./alert";


type DishItemProps = {
  dish: {
    category: Category | null;
  } & Dishe
  params: {
    id: string,
    dishId: string
  }
}

const DisheRow = ({ dish, params }: DishItemProps) => {
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
        <VisibilitySwitch visibility={dish.active} dishId={dish.id} />
      </TableCell>
      <TableCell>
        <div className="flex gap-3">

          <Link href={`/admin/restaurant/${params.id}/dishes/${dish.id}/edit`} className="grid place-content-center">
            <Pen size={16} />
          </Link>

          <AlertDelete id={params.id} dishId={dish.id} />

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

  const dishes = await prisma.dishe.findMany({
    where: {
      restaurantId: params.id
    },
    orderBy: {
      category: {
        name: 'asc'
      }
    },
    include: {
      category: true
    }
  })

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
        <Table>
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
              dishes.length === 0 ? (<TableRow>
                <TableCell className="" colSpan={7}>
                  <div className="bg-neutral-100 p-5 rounded text-center">
                    <span className="text-xl">No hay nada aqui</span>
                  </div>
                </TableCell>
              </TableRow>) : (
                <>
                  {
                    dishes.map(dish => {
                      return (
                        <DisheRow key={dish.id} dish={dish} params={params} />
                      )
                    })
                  }
                </>
              )
            }

          </TableBody>
        </Table>

      </div>

    </div >
  );
}