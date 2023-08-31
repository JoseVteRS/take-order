import { Category, Dishe } from "@prisma/client";

type DisheWithCategory = {
    category: Category | null
} & Dishe | null

type GroupedCategory = {
    category: { id: string, name: string };
    items: DisheWithCategory[];
}


export function groupByCategory(arr: DisheWithCategory[]): GroupedCategory[] {
    const groupedByCategory: Record<string, GroupedCategory> = arr.reduce(
        (acc, item) => {

            const categoryId = item!.category?.id || "__uncategorized";

            if (!acc[categoryId]) {
                acc[categoryId] = {
                    category: { id: item!.category!.id, name: item!.category?.name || "Uncategorized" },
                    items: [],
                };
            }

            if (item!.category) {
                acc[categoryId].items.push(item);
            }
            return acc;
        },
        {} as Record<string, GroupedCategory>
    );

    const groupedArray: GroupedCategory[] = Object.values(groupedByCategory);
    return groupedArray;
}