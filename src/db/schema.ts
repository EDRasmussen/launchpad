import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todoTable = sqliteTable("todo", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  description: text(),
  done: int({ mode: "boolean" }).notNull().default(false),
  updatedAt: int({ mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date()),
  createdAt: int({ mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
