import prisma from "@prisma/index";
import { ObjectId } from "mongodb";
import { AuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions: AuthOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user }) {
            try {
                if (!user.email) return false;

                const isUserDataCreated = await prisma.user.findUnique({
                    where: {
                        email: user.email
                    }
                })

                if (isUserDataCreated) return true;

                const randomUserId = new ObjectId().toHexString();

                await prisma.user.create({
                    data: {
                        id: randomUserId,
                        bal: 0,
                        email: user.email,
                    }
                });

                return true;
            } catch (e) {
                console.log("Ocorreu um erro na autenticação!", e);
                return false;
            }
        }
    }
};

/*function GenerateId() {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 1000)
    return timestamp.toString() + randomNumber.toString();
}*/