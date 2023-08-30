"use client"

import { QRCode } from "@/components/qr-code"
import { groupItemsByCategory } from "@/lib/group-order-by-category"
import { useOrderStore } from "@/store/dish.store"
import { v4 } from "uuid"

export const OrderItemsStore = ({ restaurantId }: { restaurantId: string }) => {

    const order = useOrderStore(state => state.order)
    const ordersGrouppedByCategory = groupItemsByCategory(order)


    return (
        <div>
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

            <QRCode url={`http://localhost:3000/restaurant/${restaurantId}?order=${v4()}`} />

        </div>

    )
}