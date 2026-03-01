"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import { useAddTodoItem, useUpdateTodoItem } from "./hooks";
import { todoFormSchema } from "./schema";
import type { TodoFormProps } from "./types";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";


export function TodoForm({ todo, onSuccess }: TodoFormProps) {
  const addTodo = useAddTodoItem();
  const updateTodo = useUpdateTodoItem();

  const form = useForm({
    defaultValues: {
      title: todo?.title ?? "",
      description: todo?.description ?? "",
    },
    validators: {
      onSubmit: todoFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        if (todo) {
          await updateTodo.mutateAsync({
            id: todo.id,
            title: value.title.trim(),
            description: value.description.trim(),
          });
          toast("Task updated");
        } else {
          await addTodo.mutateAsync({
            title: value.title.trim(),
            description: value.description.trim(),
          });
          toast("Task created");
          form.reset();
        }
        onSuccess?.();
      } catch {
        toast(
          todo
            ? "Something went wrong while updating your task. Please try again later"
            : "Something went wrong while processing your task creation. Please try again later"
        );
      }
    },
  });

  return (
    <form
      id="todo-form"
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field
          name="title"
          children={field => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Fix Issue #27"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <form.Field
          name="description"
          children={field => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    placeholder="Issue link: https://github.com/customer/issue/27"
                    rows={6}
                    className="min-h-24 resize-none"
                    aria-invalid={isInvalid}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.state.value.length}/255 characters
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription>
                  Include relevant links and information
                </FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>
    </form>
  );
}
