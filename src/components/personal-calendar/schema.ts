import { z } from "zod";

export const getCalendarEventsInput = z.object({
  includePrivate: z.boolean().default(true),
});
