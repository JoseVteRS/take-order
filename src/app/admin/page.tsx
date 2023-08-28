import { Separator } from "@/components/ui/separator";
import { getUserSession } from "@/lib/auth";
import Link from "next/link";
import { ButtonLogout } from "./button-logout";


const links = [
  {
    label: 'Restaurantes',
    description: 'Locales que tiene en su propiedad o quiera administrar',
    href: '/admin/restaurant'
  }
]

export default async function AdminPage() {

  const user = await getUserSession()

  return (
    <aside className="max-w-[15rem] bg-neutral-100 min-h-screen border-r border-neutral-200">

      <div className="p-3">
        <header className="my-5">
          <nav>
            <ul>
              <li className="font-semibold">Escritorio</li>
            </ul>
          </nav>
          <p> {user.name}</p>
        </header>

        <nav className="mb-5">
          <Separator className="my-5" />
          <ul>
            {
              links.map((link) => (
                <li key={link.href} className="group">
                  <Link href={link.href} className="group-hover:bg-neutral-200 rounded p-1 w-full block">
                    {link.label}
                  </Link>
                  <span className="text-xs text-neutral-400" >{link.description}</span>
                </li>
              ))
            }
          </ul>
        </nav>
        <ButtonLogout />
      </div>

    </aside>
  );
}