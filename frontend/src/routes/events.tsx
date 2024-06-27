import { createFileRoute } from '@tanstack/react-router'
import { eventQueryOptions } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/events')({
  component: StyledEvents,
})

function StyledEvents() {
  const { isPending, error, data } = useQuery(eventQueryOptions)

  if (error) return 'An error has occurred'

  return (
    <div>
      {isPending 
        ? '...' 
        : data.experiences.map((experience) => (
          <div className='p-2'>
            <p>{experience.title}</p>
            <p>{experience.maxAttendance}</p>
            <p>{experience.date}</p>
          </div>
        ))
      }
    </div>
  )
}