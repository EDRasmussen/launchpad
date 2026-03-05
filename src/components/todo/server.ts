import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { todoTable } from "@/db/schema";
import { ensureSession } from "@/lib/auth.server";

import { deleteTodoSchema, insertTodoSchema, updateTodoSchema } from "./schema";

export const getTodoList = createServerFn({ method: "GET" }).handler(
  async () => {
    await ensureSession();
    const todos = await db.select().from(todoTable);
    return todos;
  }
);

export const createTodoItem = createServerFn({ method: "POST" })
  .inputValidator(insertTodoSchema)
  .handler(async ctx => {
    await ensureSession();
    const parsedData = insertTodoSchema.parse(ctx.data);
    await db.insert(todoTable).values(parsedData);
    return { success: true };
  });

export const updateTodoItem = createServerFn({ method: "POST" })
  .inputValidator(updateTodoSchema)
  .handler(async ctx => {
    await ensureSession();
    const parsedData = updateTodoSchema.parse(ctx.data);
    await db
      .update(todoTable)
      .set({
        title: parsedData.title,
        description: parsedData.description,
      })
      .where(eq(todoTable.id, parsedData.id));
    return { success: true };
  });

export const deleteTodoItem = createServerFn({ method: "POST" })
  .inputValidator(deleteTodoSchema)
  .handler(async ctx => {
    await ensureSession();
    const parsedData = deleteTodoSchema.parse(ctx.data);
    await db.delete(todoTable).where(eq(todoTable.id, parsedData.id));
    return { success: true };
  });
