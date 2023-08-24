
export default function ClientRestaurantLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <h1>Hello Root Layout ClientRestaurant</h1>
            {children}
        </div>
    );
}