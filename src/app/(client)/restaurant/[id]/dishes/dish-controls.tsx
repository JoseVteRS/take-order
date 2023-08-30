"use client"

import { useOrderStore } from "@/store/dish.store"
import { Dishe } from "@prisma/client"
import { Plus } from "lucide-react"

export const DishControl = ({ dish }: { dish: Dishe }) => {

    const increase = useOrderStore((state) => state.addDisthToOrder)


    const handleIncrease = (e: any) => {
        e.preventDefault()
        increase(dish)
    }

    return (
        <button
            onClick={(event) => handleIncrease(event)}
            className="bg-sky-100 text-sky-800 w-5 h-5 rounded-full flex items-center justify-center">
            <Plus size={12} />
        </button>
    )

}