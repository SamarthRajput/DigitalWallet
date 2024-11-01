"use server"
// it is a server action it can be used both on frontend and backend as well, that's why we use "use server" on top
// the createOnRamptxn will take, what does the user send us, when they click on the button, they tell us i want to send this much amount from this specific provider
// and given these 2 inputs, i need to put a database entry in the onRampTransactions table 
// first, i need to extract who the user is, I need to check what the id of the user is
// No you shouldn't take userId as an argument, this is a security Vulnerability, you should never take userId as an Input bcz who is clicking the button they can send wrong user id to the server

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(amount: number, provider: string){
    // Ideally the token should come from the banking provider (hdfc/axis)
    const session = await getServerSession(authOptions);
    // using question mark because it is something called optional chaining
    const userId = session?.user?.id;

    // whenever you are creating an onramptransaction, whenever you are letting the user click on add money button before, the user goes to netbanking.hdfcbank.com you need to tell hdfcbank ki i am sending someone your way for 200 rs or whatever the amount is
    // the bank will return you a token ki bhai give that user this token so i know ki han this is the 200rs transaction you have told me about that is what token over is 
    // in the real world this would be a real token that comes from a banking server, since we dont have a banking server, we are going set it to a random string for now
    // Math.random() give you a random string which we probably want to convert it to a string using toString bcz we are passing it and prisma will complaint if we give it a number 
    // Math.random() returns a random number btw 0 and 1 there are other ways to create random string 
    const token = Math.random().toString();

    if(!userId){
        return {
            message: "You are not logged in"
        }
    }

    // but if the user is logged in create an entry 
    await prisma.onRampTransaction.create({
        // amount = amount * 100 bcz user might send with decimals endpoints or you can store as such, and when you are sending the request from frontend, the amount that you send you can multiple by 100
        // ideally just do it on a client
        data: {
            userId: Number(userId),
            amount: amount,
            startTime: new Date(),
            status: 'Processing',
            provider,
            token: token
        }
    })

    return {
        message: "On Ramp Transaction Added"
    }

}