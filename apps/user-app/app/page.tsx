import { PrismaClient } from "@repo/db/client";
const client = new PrismaClient();

export default function Home() {
  return (
    <div className="bg-pink-500 font-black">
      Hello world from user app
    </div>
  );
}
