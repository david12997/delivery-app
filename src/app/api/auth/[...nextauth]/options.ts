import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {GoogleProfile} from "next-auth/providers/google";

export const options: NextAuthOptions = { 
    providers: [
        GoogleProvider ({
            
            profile(profile: GoogleProfile) {
                console.log(profile)
                return {
                    ...profile,
                    role: profile.role ?? 'user',
                    id: profile.sub,
                    image: profile.picture,
                    
                }
            },
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Tú nombre" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials,req) {

                // Add logic here to look up the user from the credentials supplied
                const user = { id: 1, name: 'J Smith', email: ''}
                if (credentials?.username === 'test' && credentials?.password === 'password') {
                    // Any object returned will be saved in `user` property of the JWT
                    return user as any
                } else {
                    // If you return null or false then the credentials will be rejected
                    return null
                    // You can also Reject this callback with an Error or with a URL:
                    // throw new Error('error message') // Redirect to error page
                    // throw '/path/to/redirect'        // Redirect to a URL
                }
            }
        })
      ],
    
}

