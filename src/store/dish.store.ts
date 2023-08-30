import { create } from "zustand"


interface OrderState {
    dishQuantity: number
    addDisthToOrder: (by: number) => void
    removeDishFromORder: (by: number) => void
}

export const useOrderStore = create<OrderState>()((set) => ({
    dishQuantity: 0,
    addDisthToOrder: (by) => set((state) => ({ dishQuantity: state.dishQuantity + by })),
    removeDishFromORder: (by) => set((state) => ({ dishQuantity: state.dishQuantity - by })),
}))