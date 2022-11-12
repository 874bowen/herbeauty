import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { XataAdapter } from "@next-auth/xata-adapter";
import { XataClient } from "../../../util/xata";

const client = new XataClient();

export default NextAuth({
   adapter: XataAdapter(client),
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
   ],
   secret: process.env.JWT_SECTET
});