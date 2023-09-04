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
import { Button } from "@/components/ui/button";
import { EditCategory } from "./edit-category";


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
                  <EditCategory category={cat} restaurantId={params.id} />
                  <CategoryDeleteButton dishId={cat.id} />
                </div>

              </TableCell>


            </TableRow>
          ))
        }

      </TableBody>
    </Table>
  );
}