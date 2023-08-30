"use client"

import { useOrderStore } from "@/store/dish.store"


export const OrderQuantityStore = () => {
    const quantity = useOrderStore((state) => state.dishQuantity)
    return (
        <span className="absolute  w-5 h-5 bg-red-600 text-white flex items-center justify-center rounded-full -top-2 -right-2 text-xs">{quantity}</span>
    )
}