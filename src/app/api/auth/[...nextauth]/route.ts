import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma";
import { session } from "@/lib/auth"
import { verifySha512 } from "ldap-sha512";



const nextOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();

        if (user.error) throw user;

        return user;
      },
    }),
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