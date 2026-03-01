import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createTodoItem,
  deleteTodoItem,
  getTodoList,
  updateTodoItem,
} from "./server";

export function useTodoList() {
  return useQuery({
    queryKey: ["todo-list"],
    queryFn: () => getTodoList(),
  });
}

export function useAddTodoItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { title: string; description?: string }) =>
      createTodoItem({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo-list"] });
    },
  });
}

export function useUpdateTodoItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: number; title: string; description?: string }) =>
      updateTodoItem({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo-list"] });
    },
  });
}

export function useDeleteTodoItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: number }) => deleteTodoItem({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo-list"] });
    },
  });
}
