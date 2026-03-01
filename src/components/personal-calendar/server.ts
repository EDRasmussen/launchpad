import { createServerFn } from '@tanstack/react-start'
import ICAL from 'ical.js'
import { CalendarEvent } from './types'

export const getCalendarEvents = createServerFn({ method: 'GET' }).handler(
  async () => {
    const icalUrl = process.env.ICAL_URL!
    const res = await fetch(icalUrl)
    const text = await res.text()
    const jcal = ICAL.parse(text)
    const comp = new ICAL.Component(jcal)
    const events = comp.getAllSubcomponents('vevent')
    return events.map((vevent) => {
      const event = new ICAL.Event(vevent)
      return {
        summary: event.summary,
        start: event.startDate.toJSDate(),
        end: event.endDate.toJSDate(),
        location: event.location,
        description: event.description,
      }
    }) as CalendarEvent[]
  },
)
