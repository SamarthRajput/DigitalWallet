import prisma from "@repo/db/client";
import bcrypt from "bcrypt"
import  CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "example@gmail.com", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            // TODO: User credentials type from next-auth
            async authorize(credentials: any) {
                // Do zod validation, otp validation also 
                const hashedPassword = await bcrypt.hash(credentials.password, 10); 
                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                // if user exists in database 
                if(existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if(passwordValidation){
                        return {
                            // toString() => Returns a string representation of an object.
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.email
                        }
                    }
                    return null;
                }

                // if user doesnt exists create the user in the database
                try{
                    const user = prisma.user.create({
                        data: {
                            email: credentials.email,
                            password: hashedPassword
                        }
                    });
                }
                catch(e){
                    console.error(e);
                }

                return null;
            }
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({token, session}: any ){
            session.user.id = token.sub

            return session
        }
    }
}