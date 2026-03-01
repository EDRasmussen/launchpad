import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

import { deleteTodoSchema, insertTodoSchema, updateTodoSchema } from "./schema";
import { db } from "@/db";
import { todoTable } from "@/db/schema";


export const getTodoList = createServerFn({ method: "GET" }).handler(
  async () => {
    const todos = await db.select().from(todoTable);
    return todos;
  }
);

export const createTodoItem = createServerFn({ method: "POST" })
  .inputValidator(insertTodoSchema)
  .handler(async ctx => {
    const data = insertTodoSchema.parse(ctx.data);
    await db.insert(todoTable).values(data);
    return { success: true };
  });

export const updateTodoItem = createServerFn({ method: "POST" })
  .inputValidator(updateTodoSchema)
  .handler(async ctx => {
    const data = updateTodoSchema.parse(ctx.data);
    await db
      .update(todoTable)
      .set({
        title: data.title,
        description: data.description,
      })
      .where(eq(todoTable.id, data.id));
    return { success: true };
  });

export const deleteTodoItem = createServerFn({ method: "POST" })
  .inputValidator(deleteTodoSchema)
  .handler(async ctx => {
    const data = deleteTodoSchema.parse(ctx.data);
    await db.delete(todoTable).where(eq(todoTable.id, data.id));
    return { success: true };
  });
