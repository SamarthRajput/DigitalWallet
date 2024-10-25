"use client"
import { useBalance } from "@repo/store/useBalance";

export default function Home() {
  const balance = useBalance();
  return (
    <div className="bg-pink-500 font-black">
      Hello world from user app, your balance is {balance}
    </div>
  );
}
