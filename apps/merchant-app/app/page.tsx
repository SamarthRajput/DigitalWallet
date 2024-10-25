"use client"
import { useBalance } from "@repo/store/useBalance";

export default function Home() {

  const balance = useBalance();

  return (
    <div className="bg-purple-400 font-medium">
      hello world from merchant app, your balance is {balance}
    </div>
  );
}
