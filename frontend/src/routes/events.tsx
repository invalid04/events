import { createFileRoute } from '@tanstack/react-router'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/events')({
  component: StyledEvents,
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

function StyledEvents() {
  const { isPending, error, data } = useQuery({
    queryKey: ['get-all-events'],
    queryFn: getAllEvents,
  })

  if (error) return 'An error has occurred'

  return (
    <div>
      {isPending 
        ? '...' 
        : data.experiences.map((experience) => (
          <div>
            <p>{experience.title}</p>
            <p>{experience.maxAttendance}</p>
            <p>{experience.date}</p>
          </div>
        ))
      }
    </div>
  )
}