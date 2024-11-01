import { Card } from "@repo/ui/card"

export const OnRampTransaction = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` can be more specified ?
        status: string,
        provider: string
    }[]
}) => {

    if(!transactions.length){
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent Transaction 
            </div>
        </Card>
    }

    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map((t) => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Received INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {/* toDateString() -> Returns a date as a string value. */}
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