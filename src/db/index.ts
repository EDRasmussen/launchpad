import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import * as schema from "./schema";
import { requireEnv } from "@/lib/env";


const dbFileName = requireEnv("DB_FILE_NAME");
const sqlite = new Database(dbFileName);
export const db = drizzle(sqlite, { schema });
