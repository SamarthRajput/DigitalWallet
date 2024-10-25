// so everyone is importing the database dependency from the db module and not directly from node_modules

// instantiate a single instance PrismaClient and save it on the globalThis object. 
// Then we keep a check to only instantiate PrismaClient if it's not on the globalThis object otherwise use the same instance again if already present to prevent instantiating extra PrismaClient instances.

import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    return new PrismaClient();
}

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

// the prisma client is not instantiated again and again bcz on this line we check does globalThis.prisma already exists  
const prisma: ReturnType<typeof prismaClientSingleton> = globalThis.prismaGlobal ?? prismaClientSingleton()


export default prisma

// if we are not in production which means if we are in dev mode then globalThis.prisma = prisma
// globalThis is something that doesnot change and any time we hot reload
if(process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma

