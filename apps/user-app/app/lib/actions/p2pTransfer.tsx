"use server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number){
    const session = await getServerSession(authOptions);
    // if sender is not in the database or the sender is not logged in 
    const from = session?.user?.id;
    if(!from){
        return {
            message: "Error while sending "
        }
    }

    // checking if the receiver is present or not in our database
    const toUser = await prisma.user.findUnique({
        where: {
            number: to
        }
    })

    if(!toUser){
        return{
            message: "User not found"
        }
    }

    // if the sender and receiver both are present in the database
    // the transaction will take care ki all 4 operations gets successful, if anyone gets fails the whole transactions gets failed 
    await prisma.$transaction(async (txn) => {
        // locking the row in the database, so that no other request can read or write to the database at the same time 
        await txn.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`
        const fromBalance = await txn.balance.findUnique({
            where: {
                userId: from
            }
        });

        if(!fromBalance || fromBalance.amount < amount){
            throw new Error("Insufficient Balance");
        };

        await txn.balance.update({
            where: {
                userId: from
            },
            data: {
                amount: {
                    decrement: amount
                }
            }
        });

        await txn.balance.update({
            where: {
                userId: toUser.id
            },
            data: {
                amount: {
                    increment: amount
                }
            }
        });
    })
}