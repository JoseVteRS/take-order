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
import { Pen } from "lucide-react";
import Link from "next/link";
import { CategoryDeleteButton } from "./delete-button";


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
                  <CategoryDeleteButton dishId={cat.id} />
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