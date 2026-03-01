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


export function PersonalCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const { data: events, isLoading } = useCalendarEvents();

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
          <Button variant="outline" size="sm" className="ml-2 text-green-500">
            Private
          </Button>
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
