interface Item {
    id: string;
    name: string;
    description: string;
    price: number;
    active: boolean;
    restaurantId: string;
    categoryId: string;
    allergens: string[];
    createdAt: string;
    updatedAt: string;
    category: {
        id: string;
        name: string;
        description: string | null;
        createdAt: string;
        updatedAt: string;
        restaurantId: string;
    };
}

export interface GroupedItems {
    categoryId: string;
    categoryName: string;
    items: {
        dish: Item;
        quantity: number;
    }[];
}

export function groupItemsByCategory(items: any[]): GroupedItems[] {
    const groupedItems = items.reduce((accumulator, currentItem) => {
        const categoryId = currentItem.dish.categoryId;
        const existingGroup = accumulator.find((group: GroupedItems) => group.categoryId === categoryId);

        if (existingGroup) {
            existingGroup.items.push({
                dish: currentItem.dish,
                quantity: currentItem.quantity
            });
        } else {
            const newGroup: GroupedItems = {
                categoryId: categoryId,
                categoryName: currentItem.dish.category.name,
                items: [{
                    dish: currentItem.dish,
                    quantity: currentItem.quantity
                }],
            };
            accumulator.push(newGroup);
        }

        return accumulator;
    }, [] as GroupedItems[]);

    return groupedItems;
}