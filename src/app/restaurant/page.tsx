import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";


const NoRestaurants = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-sky-100 rounded p-5">
      <div className="mb-5 text-center" >
        <h2 className="text-2xl">No hay restaurantes</h2>
        <p>Da de alta tu primer restaurante</p>
      </div>
      <Button asChild>
        <Link href="/restaurant/create">
          Crea tu primer restaurante
        </Link>
      </Button>
    </div>
  )
}

export default async function RestaurantsPage() {

  const restaurants = await prisma.restaurant.findMany()




  return (
    <div>
      <h1 className="text-4xl mb-3 text-center">Restaurants</h1>

      {
        !restaurants || restaurants.length === 0 ? (<NoRestaurants />)
          : (
            <ul>
              {restaurants.map(restaurant => (
                <li key={restaurant.id}>
                  <Link href={`/restaurant/${restaurant.id}`}>{restaurant.name}</Link>
                </li>
              ))}
            </ul>
          )
      }

    </div>
  );
}