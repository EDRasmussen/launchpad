import { useHotkey } from "@tanstack/react-hotkeys";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

import { PersonalCalendar } from "@/components/personal-calendar";
import { TodoList } from "@/components/todo";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TabValue = "overview" | "links";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [tab, setTab] = React.useState<TabValue>("overview");

  const handleTabChange = React.useCallback((value: string) => {
    if (value === "overview" || value === "links") {
      setTab(value);
    }
  }, []);

  useHotkey("1", () => {
    setTab("overview");
  });
  useHotkey("2", () => {
    setTab("links");
  });

  return (
    <div className="container mx-auto min-h-screen space-y-6 py-32">
      <Tabs value={tab} onValueChange={handleTabChange}>
        <TabsList>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="inline-flex">
                <TabsTrigger value="overview">Overview</TabsTrigger>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <KbdGroup>
                <Kbd>1</Kbd>
              </KbdGroup>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="inline-flex">
                <TabsTrigger value="links">Links</TabsTrigger>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <KbdGroup>
                <Kbd>2</Kbd>
              </KbdGroup>
            </TooltipContent>
          </Tooltip>
        </TabsList>
        <TabsContent value="overview">
          <div className="flex w-full flex-row gap-6">
            <div className="basis-1/3">
              <PersonalCalendar />
            </div>
            <div className="basis-2/3">
              <TodoList />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="links">Not yet implemented</TabsContent>
      </Tabs>
    </div>
  );
}
