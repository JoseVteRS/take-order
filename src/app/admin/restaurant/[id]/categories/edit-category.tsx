import { AlertDialogHeader, AlertDialogFooter } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import prisma from "@/lib/prisma"
import { Category, Dishe } from "@prisma/client"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog"
import { Pen } from "lucide-react"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

type Props = {
  restaurantId: string,
  category: Category
}

export const EditCategory = async ({ category, restaurantId }: Props) => {


  const updateDish = async (data: FormData) => {
    "use server"
    const name = data.get('name') as string
    console.log(category.id, name)

    if (!name) {
      toast({
        variant: 'destructive',
        title: "El campo no puede estar vacío",
      })
    }

    await prisma.category.update({
      where: {
        id: category.id,
        restaurantId: restaurantId
      },
      data: {
        name: name
      }
    })

    toast({
      title: "Categoria actualizada",
    })

    revalidatePath(`/admin/restaurant/${restaurantId}/categories`)
    redirect(`/admin/restaurant/${restaurantId}/categories`)

  }


  return (

    <AlertDialog >
      <AlertDialogTrigger>
        <Pen size={16} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Nuevo nombre de categoria</AlertDialogTitle>
          <AlertDialogDescription>
            <div >
              <form action={updateDish} >
                <Input className="mb-3 mt-5" type="text" name="name" defaultValue={category.name} />
                <div className="flex" >
                  <AlertDialogAction className="flex w-full justify-end" asChild >
                    <Button type="submit" >Actualizar</Button>
                  </AlertDialogAction>
                </div>

              </form>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}