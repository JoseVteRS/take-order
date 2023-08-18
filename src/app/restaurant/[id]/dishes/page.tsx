import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Dishe } from "@prisma/client";
import { Pen, Trash } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";

type DishItemProps = {
  dish: Dishe
  params: {
    id: string
  }
}



const Dishe = ({ dish, params }: DishItemProps) => {
  
  return (
    <Link key={dish.id} href={`/restaurant/${params.id}/dishes/${dish.id}`}>
      <article >
        <div className="flex items-end justify-between gap-3 my-4">
          <div className="w-2/3">
            <span className="text-sm font-semibold">{dish.name}</span>
            <p className="text-sm text-green-700">{normalizePrice(dish.price)}{' '}€</p>
            <p className=" text-sm text-neutral-500 text">{dish.description}</p>
          </div>
          <div className="rounded-sm overflow-hidden w-[88px] h-[88px] relative">
            <img alt="asdf" src="/pizza.jpg" height={88} width={88} className="object-cover absolute min-h-full" />
          </div>
        </div>
      </article>
    </Link>
  )
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
      <TableCell>{dish.category.name}</TableCell>
      <TableCell>{normalizePrice(dish.price)}€</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Link href={`/restaurant/${params.id}/dishes/${dish.id}/edit`}>
            <Pen size={16} />
          </Link>
          <button className="text-red-500">
            <Trash size={16} />
          </button>
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

  const categories = await prisma.category.findMany({
    where: {
      restaurantId: params.id
    }
  })



  if (!restaurant) { return notFound() }

  async function createDishe(data: FormData) {
    'use server'

    const price = data.get('price') as string
    const parsePrice = parseFloat(price)
    const category = data.get('category') as string

    await prisma.dishe.create({
      data: {
        name: data.get('name') as string,
        description: data.get('description') as string,
        price: (parsePrice * 100),
        restaurantId: params.id,
        categoryId: category
      }
    })

    revalidatePath(`/restaurant/${params.id}/dishes`)
  }

 

  return (
    <div className="p-5">
      <h2 className="text-2xl text-center mb-3">Platos</h2>
      <form action={createDishe}>
        <input type="hidden" name="id" />
        <Input type="text" name="name" placeholder="Nombre del palto" className="mb-2" />
        <Input type="text" name="description" placeholder="Description breve del plato" className="mb-2" />
        <Input type="number" step={0.01} min={0} name="price" placeholder="Precio" className="mb-2" />

        <Select name="category">
          <SelectTrigger className="mb-2 w-full">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            {
              categories.map(category => (
                <SelectItem value={category.id}>{category.name}</SelectItem>
              ))
            }
          </SelectContent>
        </Select>

        <Button>Guardar Plato</Button>
      </form>
      <div className="mt-4">
        <Table>
          <TableCaption>Tu platos</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[88px]"></TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              dishes.map(dish => (
                <DisheRow dish={dish} params={params} />
              ))
            }
          </TableBody>
        </Table>
      </div>

    </div>
  );
}