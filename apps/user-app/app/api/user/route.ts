import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../lib/auth";

// Api route that shows you whether or not the user is logged in 
// so if we look at the logic it says export GET function which gets the current session from nextauth which means is the person logged in 
// getServerSession which means, the person that is logged in give me there details and if they are logged in return the user details directly to the frontend 
// and if the user is not logged in you get back a status 403

export const GET = async () => {
    // if the getServerSession calls fails, means the user isnt logged in, you should return something cleaner 
    try {
        const session = await getServerSession(authOptions);
        if(session.user){
            return NextResponse.json({
                user: session.user
            })
        } 
    } catch(e){
        return NextResponse.json({
           message: "You are not logged in"
        }, {
            status: 403  
        })
    }
    return NextResponse.json({
        message: "You are not logged in"
    }, {
        status: 403
    })
}
