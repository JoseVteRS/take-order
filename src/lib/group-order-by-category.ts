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

interface GroupedItems {
    categoryId: string;
    categoryName: string;
    items: {
        item: Item;
        quantity: number;
    }[];
}

export function groupItemsByCategory(items: any[]): GroupedItems[] {
    const groupedItems = items.reduce((accumulator, currentItem) => {
        const categoryId = currentItem.item.categoryId;
        const existingGroup = accumulator.find((group: GroupedItems) => group.categoryId === categoryId);

        if (existingGroup) {
            existingGroup.items.push({
                item: currentItem.item,
                quantity: currentItem.quantity
            });
        } else {
            const newGroup: GroupedItems = {
                categoryId: categoryId,
                categoryName: currentItem.item.category.name,
                items: [{
                    item: currentItem.item,
                    quantity: currentItem.quantity
                }],
            };
            accumulator.push(newGroup);
        }

        return accumulator;
    }, [] as GroupedItems[]);

    return groupedItems;
}