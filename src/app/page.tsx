import ButtonAuth from "@/components/button-auth";
import { getUserSession } from "@/lib/auth";


const links = [
  {
    href: '/',
    label: 'Inicio'
  },
  {
    href: '/admin/restaurant',
    label: 'Restaurante'
  },
]


export default async function Home() {
  const user = await getUserSession()

  return (
    <main className="min-h-screen">
      <header>
        <h1 className="text-3xl font-bold text-center">TakeOrder</h1>
        <nav className="mt-10">
          <ButtonAuth />
        </nav>
      </header>
    </main >
  )
}
