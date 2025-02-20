import { NextAuthOptions } from 'next-auth';
import Googleprovider from 'next-auth/providers/google';
import { CredentialsProvider } from 'next-auth/providers/credentials';
import prisma from '@repo/db';
import jwt from 'jsonwebtoken';

declare module 'next-auth' {
    interface Session {
        accessToken?: string;
        user: {
            name?: string;
            email?: string;
            image?: string;
        };
    }
}

const authOptions: NextAuthOptions = {
    providers: [
        Googleprovider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user }) {
            const { email, name } = user;
            const image = user.image || null;

            if (!email) {
                return false;
            }

            const existingUser = await prisma.user.findUnique({
                where: {
                    email: email!,
                },
            });

            if (existingUser) {
                await prisma.user.update({
                    where: {
                        id: existingUser?.id,
                    },
                    data: {
                        name: name,
                        image: image,
                    },
                });
            } else {
                await prisma.user.create({
                    data: {
                        email: email!,
                        name: name,
                        image: image,
                        role: 'NoRole',
                    },
                });
            }

            return true;
        },

        async jwt({ token, user }) {
            if (user) {
                const newToken = jwt.sign(
                    { email: user.email, name: user.name, avatar: user.image },
                    process.env.SESSION_TOKEN_SECRET || 'jwtsecret123',
                    { expiresIn: '7d' }
                );

                await prisma.user.update({
                    where: { email: user.email! },
                    data: { sessionToken: newToken },
                });

                token.accessToken = newToken;
            }

            return token;
        },

        async session({ session, token }) {
            session.accessToken = token.accessToken as string;
            return session;
        },
    },
};

export { authOptions };
