import { z } from "zod";

export const insertTodoSchema = z.object({
  title: z.string().min(1).max(80),
  description: z.string().max(150).optional(),
});

export const updateTodoSchema = z.object({
  id: z.number(),
  title: z.string().min(1).max(80),
  description: z.string().max(150).optional(),
});

export const todoFormSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(80, "Bug title must be at most 128 characters."),
  description: z
    .string()
    .max(150, "Description must be at most 255 characters."),
});
