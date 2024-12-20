import prisma from "@prisma/index";
import NextAuth, { AuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

const authOptions: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      const isUserDataCreated = await prisma.user.findUnique({
        where: {
          email: user.email
        }
      })

      if (isUserDataCreated) return true;

      await prisma.user.create({
        data: {
          bal: 0,
          email: user.email,
        }
      });

      return true;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
