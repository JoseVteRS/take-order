"use client"

import { GroupedCategory } from "@/lib/group-dishes-by-category";
import ScrollSpy from "react-ui-scrollspy";
import { Dishes } from "./dishes";

type Props = {
    dishesGroupedByCategory: GroupedCategory[],
    restaurantId: string
}

export const DishesScrollSpy = ({ dishesGroupedByCategory, restaurantId }: Props) => {
    return (
        <ScrollSpy>
            {
                dishesGroupedByCategory.map(items => {
                    return (
                        <Dishes dishes={items} restaurantId={restaurantId} />
                    )
                })
            }
        </ScrollSpy>
    )
}