import { Dishe } from "@prisma/client"
import { create } from "zustand"

type OrderItem = {
    quantity: number
    item: Dishe
}


interface OrderState {
    total: number
    order: OrderItem[],
    addDisthToOrder: (dish: Dishe) => void
    removeDisthToOrder: (dish: Dishe) => void
}

export const useOrderStore = create<OrderState>()((set) => ({
    total: 0,
    order: [],
    addDisthToOrder: (dish: Dishe) => set((state) => {

        const dishInOrder = state.order.some(d => d.item.id === dish.id)
        if (!dishInOrder) {
            return {
                total: 0,
                order: [
                    ...state.order,
                    {
                        item: dish,
                        quantity: 1
                    }
                ]
            }
        }

        const updateItems = state.order.map(p => {
            if (p.item.id !== dish.id) return p

            // Actualizar la cantidad
            p.quantity += 1
            return p
        });

        return {
            total: 0,
            order: [
                ...updateItems
            ]
        }
    }),
    removeDisthToOrder: (dish: Dishe) => set((state) => {

        const dishInOrder = state.order.some(d => d.item.id === dish.id)
        if (!dishInOrder) return

        const updateItems = state.order.find((p) => p.item.id === dish.id)
        if (updateItems?.quantity === 1) {
            return {
                total: 0,
                order: state.order.filter((p) => p.item.id !== dish.id)
            }
        }

        if (updateItems!.quantity > 1) {
            updateItems!.quantity -= 1
        }

        return {
            total: 0,
            order: [
                ...state.order
            ]
        }

    }),
}))