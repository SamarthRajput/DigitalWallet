import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
import bcrypt from "bcryptjs"

async function main(){
    const alice = await prisma.user.upsert({
        // so there is a dummy entry for the user with this email 
        where: {
            email: "testuser@gmail.com"
        },
        update: {},
        create: {
            email: "testuser@gmail.com",
            // with password 123456
            password: await bcrypt.hash('123456', 10),
            name: "Alice",
            // add some dummy balance in the users account
            Balance:{
                create: {
                    amount: 20000,
                    locked: 0
                }
            },
            // we also added some dummy OnRampTransactions
            OnRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: 'Success',
                    amount: 20000,
                    token: "122",
                    provider: "HDFC Bank",
                },
            },
        },
    })

    const bob = await prisma.user.upsert({
        where: { email: "testuser2@gmail.com"},
        update:{},
        create: {
            email: "testuser2@gmail.com",
            // with password 123123
            password: await bcrypt.hash('123123', 10),
            name: "Bob",
            // added some dummy balance in the user account
            Balance: {
                create: {
                    amount: 2000,
                    locked: 0
                }
            },
            OnRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: 'Failure',
                    amount: 2000,
                    token: "123",
                    provider: "HDFC Bank",
                },
            },
        },
    })

    console.log({alice, bob});

}

main()
    .then(async () => {
        // $disconnect() -> Disconnect from the database
        await prisma.$disconnect()
    })
    .catch(async(e) => {
        console.error(e)
        await prisma.$disconnect()
        // 
        process.exit(1)
    })