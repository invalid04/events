import { createFileRoute } from '@tanstack/react-router'
import EventCard from '@/components/Custom/EventCard'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/events')({
  component: Events,
})

async function getAllEvents() {
  const res = await api.experiences.$get()
  if (!res.ok) {
    throw new Error('server-error')
  }
  const data = await res.json()
  return data
}

function Events() {

  const { isPending, error, data } = useQuery({
    queryKey: ['get-all-events'],
    queryFn: getAllEvents,
  }) 

  return (
    <div>
      <pre>
        {isPending ? '...' : JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}