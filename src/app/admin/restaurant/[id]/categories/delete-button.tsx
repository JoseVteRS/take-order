"use client"

import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { useParams } from "next/navigation"

type Props = {
    dishId: string
}

export const CategoryDeleteButton = ({ dishId }: Props) => {

    const params = useParams()
    const id = params['id']

    const deleteCategory = async () => {
        const res = await fetch(`/api/restaurant/${id}/category/${dishId}`, {
            method: 'DELETE'
        })
        return await res.json()
    }

    return (
        <Button variant="ghost" className="text-red-500" onClick={deleteCategory}>
            <Trash size={16} />
        </Button>
    )
}