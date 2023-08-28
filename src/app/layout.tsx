import type { Metadata } from 'next'
import './globals.css'
import SessionAuthProvider from './providers'


export const metadata: Metadata = {
  title: 'Take Order',
  description: 'Pide desde la mesa',
}

type Props = {
  children: React.ReactNode,
}

export default function RootLayout(props: Props) {
  return (
    <html lang="es" className='light'>
      <body>
        <main className='min-h-screen'>
          <SessionAuthProvider>
            {props.children}
          </SessionAuthProvider>
        </main>
      </body>
    </html>
  )
}
