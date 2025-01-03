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
            console.log(user)
            try {
                if (!user.email) return false;

                const isUserDataCreated = await prisma.identifier.findUnique({
                    where: {
                        email: user.email,
                    }
                });

                console.log(isUserDataCreated);

                if (isUserDataCreated) return true;

                const randomUserId = new ObjectId().toHexString();

                const identifierUser = await prisma.identifier.create({
                    data: {
                        id: randomUserId,
                        email: user.email
                    }
                })

                const userData = await prisma.user.create({
                    data: {
                        id: randomUserId,
                        bal: 0,
                        balCard: user.id,
                        email: user.email,
                    }
                });

                console.log(userData);
                console.log(identifierUser)

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