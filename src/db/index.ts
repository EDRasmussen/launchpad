import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import { requireEnv } from "@/lib/env";

import * as authSchema from "./auth-schema";
import * as appSchema from "./schema";

const dbFileName = requireEnv("DB_FILE_NAME");
const sqlite = new Database(dbFileName);
const schema = { ...appSchema, ...authSchema };

export const db = drizzle(sqlite, { schema });
