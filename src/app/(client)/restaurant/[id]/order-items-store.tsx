"use client"

import { groupItemsByCategory } from "@/lib/group-order-by-category"
import { useOrderStore } from "@/store/dish.store"

export const OrderItemsStore = () => {

    const order = useOrderStore(state => state.order)
    const ordersGrouppedByCategory = groupItemsByCategory(order)

    return (
        <ul>
            {
                ordersGrouppedByCategory.map(item => (
                    <div key={item.categoryId} className="mb-5">
                        <h3 className="font-semibold mb-1">{item.categoryName}</h3>
                        <ul>
                            {
                                item.items.map(item => (
                                    <li key={item.item.id}>{item.item.name} ({item.quantity})</li>
                                ))
                            }
                        </ul>
                    </div>
                ))
            }
        </ul>
    )
}