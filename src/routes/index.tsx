import { createFileRoute } from "@tanstack/react-router";

import { PersonalCalendar } from "@/components/personal-calendar";
import { TodoList } from "@/components/todo";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="container mx-auto min-h-screen space-y-6 py-32">
      <div className="flex w-full flex-row gap-6">
        <div className="basis-1/3">
          <PersonalCalendar />
        </div>
        <div className="basis-2/3">
          <TodoList />
        </div>
      </div>
    </div>
  );
}
