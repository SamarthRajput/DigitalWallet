import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import prisma from "@repo/db/client";
import { OnRampTransaction } from "../../../components/OnRampTransaction";
import { P2PTransactions } from "../../../components/P2PTransactions";

async function getTransfers(){
    const session = await getServerSession(authOptions);
    const transfer = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }
    })
    return transfer.map((trn) => ({
        id: trn.id,
        amount: trn.amount,
        time: trn.timeStamp,
        to: trn.toUserId
    }))
}

async function getOnRampTransactions(){
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    })

    return txns.map((t) => ({
        id: t.id,
        amount: t.amount,
        provider: t.provider,
        time: t.startTime,
        status: t.status
    }))
}



export default async function(){

    const p2ptransfer = await getTransfers();
    const transactions = await getOnRampTransactions();


    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold"> 
            Recent Transactions
        </div>

        <div className="flex justify-between flex-col">
            <OnRampTransaction transactions={transactions} />
            <P2PTransactions transfers={p2ptransfer} />
        </div>


    </div>
}