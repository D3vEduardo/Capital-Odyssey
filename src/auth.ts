import NextAuth, { NextAuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord";
import { config } from "dotenv";
config();
import { getSession, signIn, signOut } from "next-auth/react";

const { AUTH_DISCORD_SECRET, AUTH_DISCORD_ID } = process.env;
const clientId = AUTH_DISCORD_ID!;
const clientSecret = AUTH_DISCORD_SECRET!;

const authOptions: NextAuthOptions = {
    providers: [
        DiscordProvider({
            clientId,
            clientSecret
        })
    ]
}


const auth = async () => {
    const session = getSession();
    return session;
}

const handlers = NextAuth(authOptions);

const login = async (provider: string, options?: Record<string, unknown>) => {
    return signIn(provider, options);
}

const logout = async (options?: Record<string, unknown>) => {
    return signOut(options);
}

export { auth, handlers, login, logout }