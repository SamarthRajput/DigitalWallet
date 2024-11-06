import { getServerSession } from "next-auth";
import { AppbarClient } from "../components/AppbarClient";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";


export default async function Home() {

  // If the user is signed up redirect the user to the dashboard page 
  const session = await getServerSession(authOptions);
  if(session){
    redirect("/dashboard")
  }

  return ( 
    <div className="">
      <AppbarClient />
      <div className="min-h-screen min-w-screen ">
            <div className=" bg-[#DEEFFF] pl-10 ml-10 mt-10 max-w-4xl rounded-3xl pb-72 pt-12">
              <div className="text-6xl text-[#2F3033] pt-6 ">
                Fast, safe,
              </div>
              <div className="text-6xl text-[#2F3033] pt-6">
                social
              </div>
              <div className="text-5xl text-[#2F3033] pt-6">
                Payments
              </div>
              
              <div className="text-2xl pt-10 text-[#2F3033]">
                Pay, get paid, grow a business, and more. Join the tens of millions of people on Digital Wallet.
              </div>

            </div>

      </div>  
    </div>
  )
} 
