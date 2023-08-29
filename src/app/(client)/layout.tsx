

export default function ClientRestaurantLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative">
            {children}
        </div>
    );
}