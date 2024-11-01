import prisma from "@repo/db/client";
import bcrypt from "bcryptjs"
import  CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            // the significance of name is the name we give will come in the button,for eg Sign in with Credentials
            name: "Credentials",
            // the significance of credentials is what all inputs do you want 
            credentials: {
                email: { label: "Email", type: "text", placeholder: "example@gmail.com", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            // authorize is the most imp thing, authorize is the function that gets called anytime we click on submit or click on Sign in with Credentials
            // anytime you click on submit your username and password that you put here reach this credentials argument, here is the meet of the logic that signups the user or if the user is already signed up then signins the user make sure the password is correct 
            // and if the password is correct tells the next-auth that you are good to go, if the credentials are wrong tell the next auth the credentials are wrong 
            // TODO: User credentials type from next-auth
            async authorize(credentials: any) {
                // Do zod validation, otp validation also 
                console.log(credentials.email);
                console.log(credentials.password);
                const hashedPassword = await bcrypt.hash(credentials.password, 10); 
                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                console.log(existingUser);
                // if user exists in database 
                if(existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if(passwordValidation){
                        return {
                            // toString() => Returns a string representation of an object.
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.email,
                        }
                    }
                    return null;
                }

                // if user doesnt exists we sign them up, we store them in the database, we put there email as well as there hashedPassword in the database 
                try{
                    const user = await prisma.user.create({
                        data: {
                            email: credentials.email,
                            password: hashedPassword
                        }
                    });
                    // you should send an email/( or otp to the users phonenumber) to the user here and then do email validation 

                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.email
                    }
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