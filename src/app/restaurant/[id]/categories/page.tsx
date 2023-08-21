import prisma from "@/lib/prisma";

type Props = {
  params: {
    id: string
  }
}

export default async function RestaurantCategoriesPage({ params }: Props) {

  const categories = await prisma.category.findMany({
    where: {
      restaurantId: params.id
    }
  })

  return (
    <div className="p-5" >
      <ul className="flex flex-col gap-4">
        {
          categories.map(category => (

            <li key={category.id}  >
              {category.name} 
              {
                category.description && (<span className="text-neutral-400 text-sm block">{category.description}</span>)
              }

            </li>
          ))
        }
      </ul>
    </div>
  );
}