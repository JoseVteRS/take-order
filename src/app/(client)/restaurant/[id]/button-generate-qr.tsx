"use client"

import { Button } from "@/components/ui/button";
import { useOrderStore } from "@/store/dish.store";

type Props = {
  restaurantId: string
}

export const ButtonGenerateQR = ({ restaurantId }: Props) => {

  const order = useOrderStore(state => state.order)

  console.log(order)

  const handleCreateOrder = async () => {
    const response = await fetch(`/api/restaurant/${restaurantId}/order`, {
      method: 'POST',
      body: JSON.stringify({ order, totalPrice: 100 })
    })
    return await response.json()
  }


  return (
    <>
      <Button size="lg" onClick={handleCreateOrder} className="w-full">Generar QR • 42,34 €</Button>
    </>
  )
}