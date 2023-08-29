import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getUserSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";

const Blankslate = () => {
  return (
    <div className="w-1/2 mx-auto">
      <div className="flex flex-col items-center justify-center bg-sky-100 rounded p-5 border-b border-sky-200">
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


  return (

    <div className="flex items-start">
      <aside className="min-w-[15rem] bg-neutral-100 min-h-screen border-r border-neutral-200">
        <div className="p-3">
          <header className="my-5">
            <nav>
              <ul>
                <li className="font-semibold">Restaurantes • <span className="text-sm">{restaurants.length}</span></li>
              </ul>
            </nav>
          </header>

          <nav className="mb-5">
            <Separator className="my-5" />
            <ul>
              {
                restaurants.map(restaurant => (
                  <li key={restaurant.id} className="group">
                    <Link href={`/admin/restaurant/${restaurant.id}`}
                      className="group-hover:bg-neutral-200 rounded p-1 w-full block"
                    >{restaurant.name}</Link>
                  </li>
                ))
              }
            </ul>
          </nav>

          <Button >
            <Link href={`/admin/restaurant/create`} >Nuevo Restaurante</Link>
          </Button>

        </div >

      </aside >

      {
        restaurants.length > 0 ? (
          <></>
        ) : (<Blankslate />)
      }



    </div>

  );
}