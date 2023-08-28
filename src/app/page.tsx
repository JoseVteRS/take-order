import ButtonAuth from "@/components/button-auth";
import { getUserSession } from "@/lib/auth";
import prisma from "@/lib/prisma";


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

  const findUser = await prisma.user.findUnique({
    where: {
      id: user.id
    }
  })

  if(findUser && !findUser.active && findUser.role !== 'ADMIN') {
    return (
      <p>Error 404</p>
    )
  }

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
