import { createServerFn } from "@tanstack/react-start";
import ICAL from "ical.js";

import type { CalendarEvent } from "./types";
import { requireEnv } from "@/lib/env";


export const getCalendarEvents = createServerFn({ method: "GET" }).handler(
  async () => {
    const icalUrl = requireEnv("ICAL_URL");
    const res = await fetch(icalUrl);
    if (!res.ok) {
      throw new Error(
        `Failed to fetch calendar: ${res.status} ${res.statusText}`
      );
    }
    const text = await res.text();
    const jcal = ICAL.parse(text);
    const comp = new ICAL.Component(jcal);
    const events = comp.getAllSubcomponents("vevent");
    return events.map(vevent => {
      const event = new ICAL.Event(vevent);
      return {
        summary: event.summary,
        start: event.startDate.toJSDate(),
        end: event.endDate.toJSDate(),
        location: event.location,
        description: event.description,
      };
    }) as Array<CalendarEvent>;
  }
);
