import { Card } from "@repo/ui/card"

export const P2PTransactions = ({
    transfers
}: {
    transfers: {
        time: Date,
        amount: number,
        to: number
    }[]
}) => {

    if(!transfers.length){
        return <Card title="Recent Transfers">
            <div className="text-center pb-8 pt-8">
                No Recent Transfers
            </div>
        </Card>
    }

    return <Card title="Recent Transfers" >
        <div className="pt-2">
            {transfers.map((t) => <div className="flex justify-between" key={t.to}>
                <div>
                    {/* TODO: add phone number of the to user  */}
                    <div className="text-sm">
                        Transfered INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>

                <div className="flex flex-col justify-center">
                    + Rs {t.amount / 100}
                </div>
            </div>)}
        </div>
    </Card>
}