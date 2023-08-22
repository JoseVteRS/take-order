

type Props = {
    children: React.ReactNode,
    params: {
        id: string,
        dishId: string
    }
}


export default async function RestaurantLayout({
    children,
    params
}: Props) {

    return (
        <>
            {children}
        </>
    )

}