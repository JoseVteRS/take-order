import { getUserSession } from "@/lib/auth";
import Link from "next/link";
import { ButtonLogout } from "./button-logout";


const links = [
  {
    label: 'Restaurant',
    href: '/admin/restaurant'
  }
]

export default async function AdminPage() {

  const user = await getUserSession()

  return (
    <div>
      <h1>Escritorio</h1>
      <p>User: {user.name}</p>
      <div>
        <ul>
          {
            links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))
          }
        </ul>

        <ButtonLogout />


      </div>
    </div>
  );
}