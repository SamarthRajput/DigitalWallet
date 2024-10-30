import { getServerSession } from "next-auth";
import { AppbarClient } from "../components/AppbarClient";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";


export default async function Home() {

  // If the user is signed up redirect the user to the dashboard page 
  const session = await getServerSession(authOptions);
  if(session){
    redirect("/dashboard")
  }

  return ( 
    <div>
      <AppbarClient />
      Hello world
    </div>
  )
} 
