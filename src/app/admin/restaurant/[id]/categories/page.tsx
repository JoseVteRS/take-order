import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";
import { Pen, Trash } from "lucide-react";
import Link from "next/link";


type Props = {
  params: {
    id: string
  }
}

export default async function RestaurantCategoriesPage({ params }: Props) {

  const categories = await prisma.category.findMany({
    where: {
      restaurantId: params.id
    }
  })

  return (
    <Table>
      <TableCaption>Categorias</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          categories.map(cat => (
            <TableRow key={cat.id}>
              <TableCell >{cat.name}</TableCell>
              <TableCell>{new Intl.DateTimeFormat().format(cat.createdAt)}</TableCell>

              <TableCell>
                <div className="flex gap-2">
                  <Link href={`/restaurant/${params.id}/categories/${cat.id}/edit`}>
                    <Pen size={16} />
                  </Link>
                  <button className="text-red-500">
                    <Trash size={16} />
                  </button>
                  <Link href={`/restaurant/${params.id}/categories/${cat.id}`}>
                    Visitar
                  </Link>
                </div>

              </TableCell>


            </TableRow>
          ))
        }

      </TableBody>
    </Table>
  );
}