import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import prisma from "@/lib/prisma"
import { Category, Dishe } from "@prisma/client"
import { Pen } from "lucide-react"

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
  }


  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Pen size={16} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nuevo nombre de categoria</DialogTitle>
            <DialogDescription>
              <form action={updateDish}>
                <Input type="text" name="name" defaultValue={category.name} />
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>

  )
}