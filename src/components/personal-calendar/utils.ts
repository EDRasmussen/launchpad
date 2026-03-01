export function formatEventCountLabel(eventCount: number) {
  if (eventCount == 0) return "";
  if (eventCount >= 9) return "9+";

  return eventCount.toString();
}

const STRING_SPLITS: Array<string> = [
  "________________________________________________________________________________", // teams
  "**** GN GROUP NOTICE - AUTOMATICALLY INSERTED****", // GN
];
export function formatEventDescription(description: string) {
  const formattedDescription = STRING_SPLITS.reduce(
    (desc, split) => desc.split(split)[0],
    description
  ).trim();

  return formattedDescription.length > 0
    ? formattedDescription
    : "No event description";
}

const EVENT_CANCEL_PATTERNS: Array<string> = ["Declined: ", "Annulleret: "];
export function isEventCanceled(summary: string): boolean {
  return EVENT_CANCEL_PATTERNS.some(pattern => summary.includes(pattern));
}
