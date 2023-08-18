'use client'

import { normalizePrice } from "@/lib/normalize-price"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"

export const Counter = ({ price }: { price: number }) => {

    const [counter, setCounter] = useState(1)

    const handleMinus = () => {
        if (counter < 2) return
        setCounter(oldCounter => oldCounter - 1)
    }

    const handlePlus = () => {
        setCounter(oldCounter => oldCounter + 1)
    }

    return (
        <div>
            <div className="flex items-center justify-between gap-3 bg-neutral-200 rounded w-fit px-3 mb-2">
                <button onClick={handleMinus}> <Minus size={16} /> </button>
                <span>{counter}</span>
                <button onClick={handlePlus}>
                    <Plus size={16} />
                </button>
            </div>

            <div>
                <Button className="w-full" > Añadir al pedido • {normalizePrice(price * counter)}€ </Button >

            </div>
        </div>

    )
}