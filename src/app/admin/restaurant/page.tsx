import { Button } from "@/components/ui/button";
import { getUserSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";

const Blankslate = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-sky-100 rounded p-5">
      <div className="mb-5 text-center" >
        <h2 className="text-2xl">No hay restaurantes</h2>
        <p>Da de alta tu primer restaurante</p>
      </div>
      <Button asChild>
        <Link href="/admin/restaurant/create">
          Crea tu primer restaurante
        </Link>
      </Button>
    </div>
  )
}

export default async function RestaurantsPage() {

  const user = await getUserSession()

  const restaurants = await prisma.restaurant.findMany({
    where: {
      tenantId: user.tenant.id,
    },
    orderBy: {
      createdAt: "asc"
    }
  })

  // if (restaurants.length > 0) {
  //   redirect(`/admin/restaurant/${restaurants[0].id}`)
  // }


  return (
    <div className="mx-auto container py-4">
      <div>
        <ul>
          {
            restaurants.map(restaurant => (
              <li key={restaurant.id}>
                <Link href={`/admin/restaurant/${restaurant.id}`} >{restaurant.name}</Link>
              </li>
            ))
          }
        </ul>

        <Button >
          <Link href={`/admin/restaurant/create`} >Nuevo Restaurante</Link>
        </Button>

      </div>
      {
        !restaurants && (< Blankslate />)
      }

    </div>
  );
}