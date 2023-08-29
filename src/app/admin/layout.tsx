import { GoBack } from "@/components/go-back";

export default function AdminLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative h-screen">
            <header className="bg-neutral-900 py-2 px-5 w-full text-white sticky top-0 z-10">
                <nav className="flex items-center justify-between">
                    <h1 className="font-semibold text-sm">TakeOrder | Admin </h1>
                    <div>
                        <div className="h-[40px] w-[40px] bg-neutral-200 rounded-full"></div>
                    </div>
                </nav>
            </header>



            <div className="w-full">
                <GoBack />
                {children}
            </div>
        </div>
    );
}