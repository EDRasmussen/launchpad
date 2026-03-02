import { useQuery } from "@tanstack/react-query";

import { getCalendarEvents } from "./server";

export function useCalendarEvents(includePrivate: boolean) {
  return useQuery({
    queryKey: ["calendar-events", includePrivate],
    queryFn: () => getCalendarEvents({ data: { includePrivate } }),
  });
}
