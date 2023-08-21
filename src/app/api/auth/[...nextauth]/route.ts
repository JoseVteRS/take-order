import prisma from "@/lib/prisma";
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { session } from "@/lib/auth"



const nextOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error('No profile')
      }

      await prisma.user.upsert({
        where: {
          email: profile.email
        },
        create: {
          email: profile.email,
          name: profile.name,
          avatar: (profile as any).picture,
          role: 'USER',
          tenant: {
            create: {}
          }
        },
        update: {
          name: profile.name,
          avatar: (profile as any).picture
        }
      })

      return true
    },
    session,
    async jwt({ token, user, account, profile }) {
      if (profile) {
        const user = await prisma.user.findUnique({
          where: {
            email: profile.email
          }
        })

        if (!user) throw new Error('No use found')
        token.id = user.id
        token.tenant = {
          id: user.tenantId
        }
      }
      return token
    }
  },
  pages:{
    signIn: '/auth/signin'
  }
}



const handler = NextAuth(nextOptions)
export { handler as GET, handler as POST }