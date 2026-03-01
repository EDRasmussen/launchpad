import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import type { EventEntryProps, EventListProps } from "./types";
import { formatEventDescription, isEventCanceled } from "./utils";

export function EventList({ events }: EventListProps) {
  return events.map((e, i) => <EventEntry key={i} event={e} />);
}

export function EventEntry({ event }: EventEntryProps) {
  return (
    <HoverCard openDelay={10} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div
          className={`text-muted-foreground ${isEventCanceled(event.summary) ? "line-through" : ""}`}
        >
          {event.start.toLocaleTimeString("da-DK", {
            hour: "2-digit",
            minute: "2-digit",
          })}
          {" - "}
          {event.end.toLocaleTimeString("da-DK", {
            hour: "2-digit",
            minute: "2-digit",
          })}
          {" - "}
          {event.summary}
          {event.location && ` - ${event.location}`}
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        side="right"
        className="flex max-h-64 w-64 flex-col gap-0.5 overflow-y-scroll"
      >
        <div className="font-semibold">{event.summary}</div>
        {formatEventDescription(event.description || "No event description")}
      </HoverCardContent>
    </HoverCard>
  );
}
