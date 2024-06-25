import { createFileRoute } from '@tanstack/react-router'

import EventCard from '@/components/Custom/EventCard'
import TotalEvents from '@/components/Custom/TotalEvents'

export const Route = createFileRoute('/')({
  component: () => (
    <div>
      <TotalEvents />
      <EventCard />
    </div>
  )
})
