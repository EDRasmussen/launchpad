import { useQuery } from '@tanstack/react-query'
import { getCalendarEvents } from './server'

export function useCalendarEvents() {
  return useQuery({
    queryKey: ['calendar-events'],
    queryFn: () => getCalendarEvents(),
  })
}
