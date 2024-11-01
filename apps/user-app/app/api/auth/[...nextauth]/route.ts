import NextAuth from "next-auth";
import { authOptions } from "../../../lib/auth";

const handler = NextAuth(authOptions);
 
export { handler as GET, handler as POST }
// the above line is same as these below 2 lines 
// it means ki bhai any get or post request thats coming here is being handled by the NextAuth handler 
// export const GET = handler;
// export const POST = handler;