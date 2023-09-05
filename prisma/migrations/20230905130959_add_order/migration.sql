-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL DEFAULT concat('ord_', replace((gen_random_uuid())::text, '-'::text, ''::text)),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "totalPrice" INTEGER NOT NULL DEFAULT 0,
    "restaurantId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DishInOrder" (
    "id" TEXT NOT NULL DEFAULT concat('dio_', replace((gen_random_uuid())::text, '-'::text, ''::text)),
    "quantity" INTEGER NOT NULL,
    "dishId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "DishInOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DishInOrder" ADD CONSTRAINT "DishInOrder_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dishe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DishInOrder" ADD CONSTRAINT "DishInOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
