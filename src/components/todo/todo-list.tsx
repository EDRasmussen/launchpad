import { Ellipsis } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useHotkeySequence } from "@tanstack/react-hotkeys";
import * as React from "react";

import { Kbd, KbdGroup } from "../ui/kbd";
import { useDeleteTodoItem, useTodoList } from "./hooks";
import { TodoForm } from "./todo-form";
import type { Todo } from "./types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";


export function TodoList() {
  const [createOpen, setCreateOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [editingTodo, setEditingTodo] = React.useState<Todo | null>(null);
  const { data: todoList, isLoading } = useTodoList();
  const deleteTodo = useDeleteTodoItem();

  useHotkeySequence(["C", "T"], () => {
    setCreateOpen(true);
  });

  const handleEditClick = (todo: Todo) => {
    setEditingTodo(todo);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditingTodo(null);
  };

  const handleDeleteClick = async (todo: Todo) => {
    await deleteTodo.mutateAsync({ id: todo.id });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task List</CardTitle>
        <CardDescription>Your currently active tasks</CardDescription>
        <CardAction>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <Tooltip>
              <DialogTrigger asChild>
                <TooltipTrigger asChild>
                  <Button variant="outline">Create Task</Button>
                </TooltipTrigger>
              </DialogTrigger>
              <TooltipContent>
                <KbdGroup>
                  <Kbd>C</Kbd>
                  <Kbd>T</Kbd>
                </KbdGroup>
              </TooltipContent>
            </Tooltip>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Create Task</DialogTitle>
                <DialogDescription>
                  Create a new task which will appear in the task list
                </DialogDescription>
              </DialogHeader>
              <TodoForm onSuccess={() => setCreateOpen(false)} />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" form="todo-form">
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>
      <CardContent>
        {isLoading && <div>Loading tasks...</div>}
        {!isLoading && todoList?.length === 0 && <div>No tasks</div>}
        {!isLoading &&
          todoList?.map((todo: Todo) => (
            <Item key={todo.id} variant="outline">
              <ItemContent>
                <ItemTitle>{todo.title}</ItemTitle>
                <ItemDescription>{todo.description}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"}>
                      <HugeiconsIcon
                        icon={Ellipsis}
                        strokeWidth={2}
                        className="size-4"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleEditClick(todo)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={async () => await handleDeleteClick(todo)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ItemActions>
            </Item>
          ))}

        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>
                Update the details of your task
              </DialogDescription>
            </DialogHeader>
            {editingTodo && (
              <TodoForm todo={editingTodo} onSuccess={handleEditClose} />
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onClick={handleEditClose}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" form="todo-form">
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
