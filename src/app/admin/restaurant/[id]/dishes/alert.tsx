"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

type Props = {
    id: string
}

export const AlertDelete = ({ id }: Props) => {

    const deleteDish = async ()=> {
        const res = await fetch(`/api/dish/${id}`, {
            method: 'DELETE'
        })

        return await res.json()
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" asChild><Trash size={16} className="text-red-700" /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Seguro que quieres eliminar el plato?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción será permanente y no se podrá recuperar.
                        Puedes marcar el plato como oculto si no quieres que se muestre en la carta.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>

                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteDish} >
                        Eliminar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}