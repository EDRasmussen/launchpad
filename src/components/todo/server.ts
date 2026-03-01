import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { todoTable } from "@/db/schema";

import { insertTodoSchema, updateTodoSchema } from "./schema";

export const getTodoList = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const todos = await db.select().from(todoTable);
      return todos ?? [];
    } catch (error) {
      console.error("Error fetching todos:", error);
      return [];
    }
  }
);

export const createTodoItem = createServerFn({ method: "POST" })
  .inputValidator(insertTodoSchema)
  .handler(async ctx => {
    const data = insertTodoSchema.parse(ctx.data);

    try {
      await db.insert(todoTable).values(data);
      return { success: true };
    } catch (error) {
      console.error("Error adding todo:", error);
      return { success: false };
    }
  });

export const updateTodoItem = createServerFn({ method: "POST" })
  .inputValidator(updateTodoSchema)
  .handler(async ctx => {
    const data = insertTodoSchema.parse(ctx.data);

    try {
      await db
        .update(todoTable)
        .set({
          title: data.title,
          description: data.description,
        })
        .where(eq(todoTable.id, todoTable.id));
      return { success: true };
    } catch (error) {
      console.error("Error adding todo:", error);
      return { success: false };
    }
  });
