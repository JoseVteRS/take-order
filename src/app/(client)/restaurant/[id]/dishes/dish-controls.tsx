"use client"

import { useOrderStore } from "@/store/dish.store"
import { Dishe } from "@prisma/client"
import { Minus, Plus } from "lucide-react"

export const DishControl = ({ dish }: { dish: Dishe }) => {

    const increase = useOrderStore((state) => state.addDisthToOrder)
    const order = useOrderStore((state) => state.order)

    const handleIncrease = (e: any) => {
        e.preventDefault()
        increase(dish)
    }


    const orderCountItems = order.find((item) => item.item.id === dish.id)

    return (
        <div className="flex items-center justify-between w-full mt-3">
            {orderCountItems?.quantity === 0 || orderCountItems?.quantity !== undefined && (
                <div className="flex gap-10">
                    <button
                        className="bg-sky-100 text-sky-800 w-5 h-5 rounded-full flex items-center justify-center">
                        <Minus size={12} />
                    </button>
                    <span className="font-bold">
                        {orderCountItems?.quantity}x
                    </span>
                </div>
            )

            }

            <div className="flex justify-end w-full">
                <button
                    onClick={(event) => handleIncrease(event)}
                    className="bg-sky-100 text-sky-800 w-5 h-5 rounded-full flex items-center justify-center">
                    <Plus size={12} />
                </button>
            </div>

        </div>

    )

}