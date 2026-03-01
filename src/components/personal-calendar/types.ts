export interface CalendarEvent {
  summary: string
  start: Date
  end: Date
  location: string | null
  description: string | null
}

export interface EventListProps {
  events: CalendarEvent[]
}

export interface EventEntryProps {
  event: CalendarEvent
}
