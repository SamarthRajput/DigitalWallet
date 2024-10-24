import { PrismaClient } from "@repo/db/client";
const client = new PrismaClient();

export default function Home() {
  return (
    <div className="bg-purple-400 font-medium">
      hello world from merchant app
    </div>
  );
}
