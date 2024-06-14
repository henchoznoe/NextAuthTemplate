import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if ( !credentials?.email || !credentials?.password ) return null;
        const existingUser = await db.user.findUnique({
          where: {
            email: credentials?.email
          }
        });
        if ( !existingUser ) return null;
        const passwordMatch = await compare(credentials!.password, existingUser.password);
        if ( !passwordMatch ) return null;
        return {
          id: existingUser.id,
          username: existingUser.username,
          email: existingUser.email
        };
      },
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 4 * 60 * 60,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if ( user ) {
        return {
          ...token,
          username: user.username
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
        }
      }
    }
  }
}