import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";

import { db } from "@/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "sqlite" }),
  baseURL: "http://localhost:3000", // add this
  emailAndPassword: {
    enabled: true,
  },
  plugins: [tanstackStartCookies()],
});
