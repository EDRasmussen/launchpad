import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createTodoItem, getTodoList } from "./server";

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
