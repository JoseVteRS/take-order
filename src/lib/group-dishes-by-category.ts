import { Dishe } from "@prisma/client";

type DisheWithCategory = {

    category: {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date | null;
        restaurantId: string;
    } | null;
} & {
    id: string;
    name: string;
    description: string | null;
    updatedAt: Date | null;
}



export const groupedByCategory = (data: DisheWithCategory[]) => {
    data.reduce((result, item) => {
        const categoryId = item.category?.id;

        if (!result[categoryId]) {
            result[categoryId] = {
                category: item,
                items: []
            };
        }

        result[categoryId].items.push(item);

        return result;
    }, {});
}
