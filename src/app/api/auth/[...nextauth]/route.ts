import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare, hash } from 'bcrypt'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from '../../../../../prisma/db.server'

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    type: 'text',
                },
                password: {
                    type: 'password',
                }
            },
            async authorize(credentials) {
                
                if(!credentials?.username || !credentials.password){
                    throw new Error('Password or username is missing')
                }

                else if(credentials.username.length >= 32 || credentials.password.length >= 32){
                    throw new Error('Password or username is too long')
                }

                const user = await prisma.user.findUnique({
                    where: {
                        name: credentials.username
                    }
                })

                // if user wasnt found, its a new one
                // then we should create them an account
                if(!user){
                    const passwordHashed = await hash(credentials.password, 12) 
                    const newUser = await prisma.user.create({
                        data: {
                          name: credentials.username,
                          password: passwordHashed,
                        },
                    })
                    if(!newUser) throw new Error('Unknown server error')
                    else return newUser
                }

                // otherwise the user exists and we check their
                // password in the database
                const validPassword = await compare(
                    credentials.password,
                    user.password
                )

                if(!validPassword){
                    throw new Error('Invalid password')
                }

                return user
            }
        })
    ],
    pages: {
        signIn: '/login',
        error: '/login',
    },
    secret: process.env.JWT_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }