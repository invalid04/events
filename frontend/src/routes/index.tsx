import { createFileRoute } from '@tanstack/react-router'

import EventCard from '@/components/Custom/EventCard'
import TotalEvents from '@/components/Custom/TotalEvents'

export const Route = createFileRoute('/')({
  component: () => (
    <div className='flex flex-col gap-2 m-2'>
      <TotalEvents />
      <EventCard />
    </div>
  )
})
