"use client"

import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Select } from "@repo/ui/select"
import { TextInput } from "@repo/ui/text-input"
import { useState } from "react"

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com"
}]


export const AddMoneyCard = () => {

    const [redirectUrl, SetRedirectUrl]= useState(SUPPORTED_BANKS[0]?.redirectUrl)
    const [amount, setAmount] = useState("");

    return <Card title="AddMoney" >
        <div className="w-full">   
            <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
                setAmount(value)
            }}/>

        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(value) => {
            SetRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
        }}  options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))}/>

        <div className="flex justify-center pt-4">
            <Button onClick={() => {
                window.location.href = redirectUrl || "";
            }}>
                Add Money
            </Button>
        </div>

        </div>
    </Card>

}