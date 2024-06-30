import { createFileRoute, useParams } from '@tanstack/react-router'

import { eventByIdQueryOptions } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/events/$eventId')({
  component: () => <div>Hello /events/$eventId!</div>,

})

interface Event {
  id: number,
  title: string,
  description: string,
  location: string,
  maxAttendees: string
}

const EventComponent = () => {
  const { eventId } = useParams({ from: '/events/$eventId'})

  const { isPending, error, data } = useQuery(eventByIdQueryOptions(Number(eventId)))

  if (isPending) return '...'
  if (error) return 'error'

  const event: Event | undefined = data as Event
}