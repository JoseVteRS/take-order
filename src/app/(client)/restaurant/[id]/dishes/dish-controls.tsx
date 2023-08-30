"use client"

import { useOrderStore } from "@/store/dish.store"
import { Plus } from "lucide-react"

export const DishControl = () => {

    const quantity = useOrderStore((state) => state.dishQuantity)
    const increase = useOrderStore((state) => state.addDisthToOrder)
    const decrease = useOrderStore((state) => state.removeDishFromORder)

    const handleIncrease = (e: any) => {
        e.preventDefault()
        increase(1)
    }

    return (
        <button
            onClick={(event) => handleIncrease(event)}
            className="bg-sky-100 text-sky-800 w-5 h-5 rounded-full flex items-center justify-center">
            <Plus size={12} />
        </button>
    )

}