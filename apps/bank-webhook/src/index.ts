import prisma from "@repo/db/client";
import express from "express";

const app = express();
// TODO: add zod validation here 
// TODO: check if this request actually came from hdfc bank, use a webhook secret here  

// this the endpoint that hdfc bank will hit, whenever my user pays hdfc bank some money and hdfc bank transfer that money over to my bank, and tells me ki bro transfer is done
// pls put 1000 rs in there wallet balance

// here is the userId for your database, and here is the amount that you need to credit to this perso, this specific person has paid this much amount on netbanking.hdfcbank.com
app.post("/hdfcWebhook", async (req, res) => {
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }; 

    // Update balance in db, add txn
    // update the balance where the userId of the user is this, increase the amount by this much  
    await prisma.balance.update({
        where: {
            userId: paymentInformation.userId
        },
        // set the data to be 
        data: {
            amount: {
                increment: paymentInformation.amount
            }
        }
    });

    // the token is how you identify an onRamptransaction, so whenever you are creating this OnRampTransaction from the ui you will first put this entry on you OnRampTransaction table
    // you will store the token there, eventually when hdfc bank tells you, send the token along thats how you can identifies the specific OnRampTransaction 
    await prisma.onRampTransaction.update({
        where: {
            token: paymentInformation.token
        },
        data: {
            status: "Success"
        }
    });

    // If you do this, you tell the hdfc bank server, ki bro status 200, i have been able to process the request, i have captured the request 
    // this is super imp if we dont do this or if we send a bad status code then hdfc bank will feel ki they were not able to capture this request and they will refund the money to user 
    res.json({
        message: "captured"
    })
});