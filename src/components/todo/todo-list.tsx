import { Ellipsis } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";

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

import { useTodoList } from "./hooks";
import { TodoForm } from "./todo-form";

export function TodoList() {
  const [open, setOpen] = React.useState(false);
  const { data: todoList, isLoading } = useTodoList();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task List</CardTitle>
        <CardDescription>Your currently active tasks</CardDescription>
        <CardAction>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Create Task</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Create Task</DialogTitle>
                <DialogDescription>
                  Create a new task which will appear in the task list
                </DialogDescription>
              </DialogHeader>
              <TodoForm onSuccess={() => setOpen(false)} />
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
          todoList?.map(todo => (
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
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ItemActions>
            </Item>
          ))}
      </CardContent>
    </Card>
  );
}
