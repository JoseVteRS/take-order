import NextAuth, { NextAuthOptions } from "next-auth"
// import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma";
import { verifySha512 } from "ldap-sha512";
import { session } from "@/lib/auth"


const nextOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email
          }
        })

        if (!user || !(await verifySha512(credentials.password, user.password!))) return null

        return {
          id: user.id,
          tenant: {
            id: user.tenantId
          },
          email: user.email,
          name: user.name
        }

      },
    }),
  ],

  callbacks: {
    session,
    async jwt({ token, profile }) {
      const user = await prisma.user.findFirst({
        where: {
          email: token.email!
        }
      })

      if (!user) throw new Error('User not found')

      token.id = user.id
      token.tenant = {
        id: user.tenantId,
      }

      return token
    },

  },
}



const handler = NextAuth(nextOptions)
export { handler as GET, handler as POST }