import { NextRequest, NextResponse } from "next/server";
import { getCode, fetchUserData } from "magic-dc-oauth2";
import { config } from "dotenv"; config();
import crypto from "crypto";

const {
    DISCORD_CLIENT_ID: clientId,
    DISCORD_CLIENT_SECRET: clientSecret,
    ENCRYPTION_SECRET: encryptionSecret
} = process.env;

export async function GET(req: NextRequest) {
    const requestUrl = new URL(req.url);
    const code = requestUrl.searchParams.get("code");

    const redirectUri = `${requestUrl.protocol}//${requestUrl.host}/api/auth`;

    /*console.log("Client ID:", clientId);
    console.log("Client Secret:", clientSecret ? "OK" : "Não configurado");
    console.log(redirectUri);
    console.log(code);*/
    if (code) {
        const accessToken = await getCode(clientId!, clientSecret!, code, redirectUri);
        //console.log("Token recebido:", accessToken);
        const accessTokenEncrypted = encryptToken(accessToken!);
        /*console.log("Token criptografado:", accessTokenEncrypted);
        const accessTokenDescrypted = descryptToken(accessTokenEncrypted);
        console.log("Token descriptografado:", accessTokenDescrypted);*/
        return NextResponse.redirect(`${requestUrl.protocol}//${requestUrl.host}/callback?token=${accessTokenEncrypted}`);
    }

    return NextResponse.redirect(`${requestUrl.protocol}//${requestUrl.host}/callback?token=not-found`);

}

export async function POST(req: NextRequest) {
    const requestBody: { encryptedToken: string } = await req.json();
    const encryptedToken = requestBody.encryptedToken;

    if (!encryptedToken) {
        throw new Error("Token criptografado não informado!");
    }

    const descryptedToken = descryptToken(encryptedToken);
    const discordUserData = await fetchUserData(descryptedToken);

    return NextResponse.json(discordUserData);
}

function encryptToken(token: string) {
    const algorithm = "aes-256-cbc"
    const key = crypto.scryptSync(encryptionSecret!, "salt", 32);
    const iv = crypto.randomBytes(16);

    const chiper = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = chiper.update(token, "utf8", "hex");
    encrypted += chiper.final("hex");

    return `${iv.toString("hex")}:${encrypted}`;
}

function descryptToken(encryptedToken: string) {
    const algorithm = "aes-256-cbc";
    const key = crypto.scryptSync(encryptionSecret!, "salt", 32);
    const [iv, encrypted] = encryptedToken.split(":");

    if ( !iv || !encrypted ) {
        throw new Error("Token criptografado inválido!");
    }

    const dechiper = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, "hex"));
    let decrypted = dechiper.update(encrypted, "hex",  "utf8");
    decrypted += dechiper.final("utf8");

    return decrypted;
}