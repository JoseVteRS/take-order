
export default function RestaurantLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="md:container md:mx-container">
            
            {children}
        </section>
    );
}