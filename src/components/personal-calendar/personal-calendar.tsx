import { useHotkey } from "@tanstack/react-hotkeys";
import React from "react";

import { EventList } from "./event-list";
import { useCalendarEvents } from "./hooks";
import { formatEventCountLabel } from "./utils";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";


export function PersonalCalendar() {
  const [privateCalendar, setPrivateCalendar] = React.useState(true);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const { data: events, isLoading } = useCalendarEvents(privateCalendar);
  useHotkey("P", () => {
    setPrivateCalendar(p => !p);
  });

  const filteredEvents =
    events?.filter(
      e => date && e.start.toDateString() === date.toDateString()
    ) ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
        <CardDescription>Today's events</CardDescription>
        <CardAction>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "ml-2 px-2",
                  privateCalendar
                    ? "text-green-500 hover:text-green-500"
                    : "text-red-500 hover:text-red-500"
                )}
                onClick={() => setPrivateCalendar(p => !p)}
              >
                Private
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <KbdGroup>
                <Kbd>P</Kbd>
              </KbdGroup>
            </TooltipContent>
          </Tooltip>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          weekStartsOn={1}
          selected={date}
          onSelect={setDate}
          className="w-full border"
          captionLayout="dropdown"
          components={{
            DayButton: ({ children, modifiers, day, ...props }) => {
              const eventCount =
                events?.filter(
                  e => day.date.toDateString() == e.start.toDateString()
                ).length || 0;
              return (
                <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                  {children}
                  {!modifiers.outside && (
                    <span>{formatEventCountLabel(eventCount)}</span>
                  )}
                </CalendarDayButton>
              );
            },
          }}
        />
      </CardContent>
      <CardFooter>
        <div className="space-y-2 text-sm">
          <CardTitle>
            {date?.toLocaleDateString("da-DK", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </CardTitle>
          {isLoading && (
            <div className="text-muted-foreground">Loading events...</div>
          )}
          {!isLoading && filteredEvents.length === 0 && (
            <div className="text-muted-foreground">No events</div>
          )}
          {!isLoading && filteredEvents.length > 0 && (
            <EventList events={filteredEvents} />
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
