import prisma from "@/lib/prisma";

type Params = {
    params: { id: string }
}

export default async function RestaurantOrdersPage({ params }: Params) {

    const orders = await prisma.order.findMany({
        where: {
            restaurantId: params.id
        }
    })

    return (
        <div>
            <h1>Pedidos</h1>
            <div>

                <ul>
                    {
                        orders.map(item => (
                            <li key={item.id}>
                                ID: {item.id} - {item.totalPrice} €
                            </li>
                        ))
                    }
                </ul>

            </div>
        </div>
    );
}