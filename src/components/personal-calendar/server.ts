import { createServerFn } from "@tanstack/react-start";
import ICAL from "ical.js";

import { getEnv, requireEnv } from "@/lib/env";

import type { CalendarEvent } from "./types";

async function getCalendarEventsFromURL(
  url: string
): Promise<Array<CalendarEvent>> {
  const res = await fetch(url);
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

export const getCalendarEvents = createServerFn({ method: "GET" }).handler(
  async () => {
    const workIcalUrl = requireEnv("ICAL_URL");
    const personalIcalUrl = getEnv("PERSONAL_ICAL_URL");

    const [workEvents, personalEvents] = await Promise.all([
      getCalendarEventsFromURL(workIcalUrl),
      personalIcalUrl === undefined
        ? Promise.resolve([])
        : getCalendarEventsFromURL(personalIcalUrl),
    ]);

    return [...workEvents, ...personalEvents].sort(
      (a, b) => a.start.getTime() - b.start.getTime()
    );
  }
);
