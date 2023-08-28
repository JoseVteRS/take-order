"use client"

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { getUserSession } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { login } from '@/actions/userAction'
import { useState } from 'react'
import { isGeneratorFunction } from 'util/types'


interface InitialStateProps {
    name: string,
    email: string,
    password: string
}

const initialState: InitialStateProps = {
    name: '',
    email: '',
    password: ''
}

export default function LogiPage() {

    const { data: user } = useSession()

    if (user) redirect('/admin/')

    const [state, setState] = useState<InitialStateProps>(initialState)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!state.email || !state.password) return

        signIn('credentials', {
            email: state.email,
            password: state.password,
            redirect: true,
            callbackUrl: '/admin/'
        })
    }

    return (
        <div className='w-1/2 mx-auto'>

            <form onSubmit={handleSubmit} className='text-center'>
                <Input placeholder='Email' id='email' type="email" name='email'
                    onChange={(event) => setState({ ...state, email: event.target.value })}
                />
                <Input placeholder='Password' id='password' type="password" name='password'
                    onChange={(event) => setState({ ...state, password: event.target.value })}
                />

                <Button type='submit'>Submit</Button>
            </form>



            <div>
                <div>Haven&apos;t got an account ? <Link href='/auth/register'>Sign up</Link></div>
            </div>

        </div>

    )
}
