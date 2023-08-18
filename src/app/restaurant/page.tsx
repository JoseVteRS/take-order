import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RestaurantsPage() {

  const restaurants = await prisma.restaurant.findMany()

  console.log(restaurants);


  return (
    <div>
      <h1>Restaurants de Jose</h1>

      {
        !restaurants || restaurants.length === 0 ? (
          redirect('/')
        )
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