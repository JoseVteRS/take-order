import prisma from "@/lib/prisma";

type Params = {
    params: {
        id: string,
        orderId: string
    }
}

export default async function RestaurantOrderItemPage({ params }: Params) {

    const order = await prisma.dishInOrder.findMany({
        where: {
            orderId: params.orderId
        }
    })

    console.log

    return (
        <div>
            <h1>Hello Page RestaurantOrderItem</h1>
            <div>
                
            </div>
        </div>
    );
}