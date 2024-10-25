"use client"
import { useBalance } from "@repo/store/useBalance";
import { Appbar } from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  const balance = useBalance();
  return (
    <div className="bg-pink-500 font-black">
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user}/>
      Hello world from user app, your balance is {balance}
    </div>
  );
}
