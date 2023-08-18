import Link from "next/link";
import { } from "next/navigation";

type Props = {
    params: {
        id: string
    }
}

export default async function RestaurantDetailPage({ params }: Props) {


    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link href={`/restaurant/${params.id}/dishes`}  >Platos</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}