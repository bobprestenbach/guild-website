import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import { sendWelcomeEmail } from '@/lib/email'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id
      return session
    },
  },
  events: {
    async createUser({ user }) {
      if (!user.id) return
      await prisma.membership.upsert({
        where: { userId: user.id },
        update: {},
        create: { userId: user.id, tier: 'EXPLORER' },
      })
      if (user.email && user.name) {
        await sendWelcomeEmail(user.email, user.name).catch(() => {})
      }
    },
  },
  pages: {
    signIn: '/signin',
  },
})
