import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

async function main(){
    const alice = await prisma.user.upsert({
        where: {
            email: "testuser@gmail.com"
        },
        update: {},
        create: {
            email: "testuser@gmail.com",
            password: "123456",
            name: "Alice",
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
            password: "123123",
            name: "Bob",
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