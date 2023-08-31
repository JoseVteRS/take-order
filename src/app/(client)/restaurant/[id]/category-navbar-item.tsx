"use client"

import { Category } from "@prisma/client"

type Props = {
    category: Category
}

export const CategoryNavbarItem = ({ category }: Props) => {

    const onPress = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const target = window.document.getElementById(
            e.currentTarget.href.split("#")[1]
        );
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <li key={category.id}
            className="inline-block py-2 px-4 text-neutral-900 hover:text-neutral-900 hover:bg-neutral-100 rounded"
        >
            <a onClick={(e) => onPress(e)} href={`#${category.name}`} >
                <div data-to-scrollspy-id={category.name}>
                    {category.name}
                </div>
            </a>
        </li >
    )
}