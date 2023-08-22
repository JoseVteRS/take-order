import { Restaurant } from "@prisma/client";
import { useEffect, useState } from "react"

type Return = {
    loading: boolean,
    restaurant: Restaurant | []
}

export const useRestaurant = (id: string): Return => {
    if (!id) { return { loading: false, restaurant: [] } };

    const [restaurantList, setRestaurantList] = useState<Restaurant>()
    const [loading, setLoading] = useState<boolean>(false)


    const getRestaurantById = async (): Promise<Restaurant> => {
        const response = await fetch(`/api/restaurant/${id}`)
        const restaurnats = await response.json()
        return restaurnats
    }

    useEffect(() => {
        setLoading(true)
        getRestaurantById().then((response: Restaurant) => {
            return setRestaurantList(response)
        })
        setLoading(false)
    }, [id])

    return {
        loading,
        restaurant: restaurantList || []
    }

}