import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma";
import { session } from "@/lib/auth"
import { verifySha512 } from "ldap-sha512";



const nextOptions: NextAuthOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID || "",
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    // }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },

      //@ts-ignore
      async authorize(credentials) {
        if (!credentials) throw new Error('No credentials')

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })
        if (!user || !user.password) throw new Error('Correo y Contraseña son obligatorios')
        const verifiedPassword = verifySha512(credentials.password, user.password)
        if (!verifiedPassword) throw new Error('No user')
        return user
      }

    })
  ],
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 Days
  },

  callbacks: {
    // async signIn({ account, profile }) {
    //   if (!profile?.email) {
    //     throw new Error('No profile')
    //   }

    //   await prisma.user.upsert({
    //     where: {
    //       email: profile.email
    //     },
    //     create: {
    //       email: profile.email,
    //       name: profile.name,
    //       avatar: (profile as any).picture,
    //       role: 'USER',
    //       tenant: {
    //         create: {}
    //       }
    //     },
    //     update: {
    //       name: profile.name,
    //       avatar: (profile as any).picture
    //     }
    //   })

    //   return true
    // },
    session,
    async jwt({ token, user }) {
      console.log('JWT', { token, user })
      return { ...token, ...user };
    },
  },
  debug: process.env.NODE_ENV === 'development',
}



const handler = NextAuth(nextOptions)
export { handler as GET, handler as POST }