import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import { P2PTransactions } from "../../../components/P2PTransactions";
import prisma from "@repo/db/client";

// TODO: Add entries to p2pTransfer whenever a transfer happens and show transactions on the frontend
// TODO: Add frontend for the p2p transactions

async function getTransfers(){
    const session = await getServerSession(authOptions);
    const transfer = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }
    });
    return transfer.map((trn) => ({
        id: trn.id,
        amount: trn.amount,
        time: trn.timeStamp,
        to: trn.toUserId
    }))
}


export default async function(){

    const transfers = await getTransfers();

    return <div className="w-screen">

        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            P2P Transfer
        </div>  

        <div className="grid grid-cols gap-4 md:grid-cols-2 p-4">
            <SendCard />
            <div>
                <P2PTransactions transfers={transfers} />
            </div>
        </div>

    </div>
}