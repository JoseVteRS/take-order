import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

const Blankslate = () => {
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

  const restaurants = await prisma.restaurant.findMany({
    where: {
      tenantId: "c923e53b-7a6c-4260-9af6-7ad3d37275f1",
    },
    orderBy: {
      createdAt: "asc"
    }
  })

  if (restaurants.length > 0) {
    redirect(`/admin/restaurant/${restaurants[0].id}`)
  }


  return (
    <div className="mx-auto container py-4">
      {<Blankslate />}
    </div>
  );
}