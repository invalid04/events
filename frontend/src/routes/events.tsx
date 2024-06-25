import { createFileRoute } from '@tanstack/react-router'
import EventCard from '@/components/Custom/EventCard'

export const Route = createFileRoute('/events')({
  component: Events,
})

function Events() {
  return (
    <div>
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
    </div>
  )
}