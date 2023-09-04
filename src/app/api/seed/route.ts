import prisma from "@/lib/prisma";
import { sha512Crypt } from "ldap-sha512"
import { NextResponse } from "next/server";

const formatPrice = (price: number) => price * 100

export async function POST() {

  const hashedPassword = await sha512Crypt("123456", '10');



  const createUser = prisma.user.create({
    data: {
      name: "Test User",
      email: "jvrs.90@gmail.com",
      password: hashedPassword,
      tenant: {
        create: {}
      }
    }
  })


  const createRestaurant = prisma.restaurant.create({
    data: {
      name: "Test Restaurant",
      tenantId: (await createUser).tenantId,
      userId: (await createUser).id,
    }
  })


  const createCategory = await prisma.category.createMany({
    data: [
      {
        name: "Entrantes",
        restaurantId: (await createRestaurant).id,
      },
      {
        name: "Bebidas",
        restaurantId: (await createRestaurant).id,
      },
      {
        name: "Pizzas",
        restaurantId: (await createRestaurant).id,
      },
      {
        name: "Bocadillos",
        restaurantId: (await createRestaurant).id,
      },
      {
        name: "Postres",
        restaurantId: (await createRestaurant).id,
      },
    ]
  })

  const createDish = prisma.dishe.createMany({
    data: [
      {
        name: "Pizza Margarita",
        price: formatPrice(10),
        allergens: ['1', '4'],
        restaurantId: (await createRestaurant).id,
      },
      {
        name: "Pizza 4 Quesos",
        price: formatPrice(12),
        allergens: ['1', '4'],
        restaurantId: (await createRestaurant).id,
      },
      {
        name: "Pizza Barbacoa",
        price: formatPrice(12),
        allergens: ['1', '4'],
        restaurantId: (await createRestaurant).id,
      },
      {
        name: "Pizza Carbonara",
        price: formatPrice(12),
        allergens: ['1', '4'],
        restaurantId: (await createRestaurant).id,
      },
      {
        name: "Agua",
        price: formatPrice(1.5),
        allergens: [],
        restaurantId: (await createRestaurant).id,
      },
      {
        name: "Coca Cola",
        price: formatPrice(2),
        allergens: [],
        restaurantId: (await createRestaurant).id,
      },
      {
        name: "Fanta",
        price: formatPrice(2),
        allergens: [],
        restaurantId: (await createRestaurant).id,
      },
      {
        name: "Cerveza",
        price: formatPrice(2.5),
        allergens: [],
        restaurantId: (await createRestaurant).id,
      },
      {
        name: "Tarta de Queso con galleta Lotus",
        price: formatPrice(7),
        allergens: [],
        restaurantId: (await createRestaurant).id,
      },
      {
        name: "Tarta de Chocolate",
        price: formatPrice(5.9),
        allergens: [],
        restaurantId: (await createRestaurant).id,
      },
      {
        name: "Tarta de Zanahoria",
        price: formatPrice(5.9),
        allergens: [],
        restaurantId: (await createRestaurant).id,
      },
      {
        name: "Patatas bravas",
        price: formatPrice(5.5),
        allergens: [],
        restaurantId: (await createRestaurant).id,
      },
      {
        name: "Patatas alioli",
        price: formatPrice(6.56),
        allergens: [],
        restaurantId: (await createRestaurant).id,
      },
      {
        name: "Humus de garbanzos",
        price: formatPrice(4.95),
        allergens: [],
        restaurantId: (await createRestaurant).id,
      },
    ]
  })


  await Promise.all([
    createUser,
    createRestaurant,
    createCategory,
    createDish
  ])


  return NextResponse.json({ message: 'Seed Executed' });

}


