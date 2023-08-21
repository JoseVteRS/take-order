import { getUserSession } from "@/lib/auth";
import Link from "next/link";


const links = [
  {
    href: '/',
    label: 'Inicio'
  },
  {
    href: '/restaurant',
    label: 'Restaurante'
  },
]


export default async function Home() {
  const user = await getUserSession()


  console.log('USER', user)


  return (
    <main className="min-h-screen">
      <header>
        <h1 className="text-3xl font-bold text-center">TakeOrder</h1>
        <nav className="mt-10">
          <ul className="flex gap-3 items-center justify-center">
            {
              !user && (<li>
                <Link href="/auth/signin">
                  Register
                </Link>
              </li>)
            }

            {
              links.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>
                    {label}
                  </Link>
                </li>
              ))
            }
          </ul>
          <div>
            Username
          </div>
        </nav>
      </header>
      <div>




      </div>
    </main >
  )
}
