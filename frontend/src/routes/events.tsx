import { createFileRoute } from '@tanstack/react-router'
import { eventQueryOptions, loadingCreateExperienceQueryOptions } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/events')({
  component: StyledEvents,
})

function StyledEvents() {
  const { isPending, error, data } = useQuery(eventQueryOptions)
  const { data: loadingCreateExperience } = useQuery(loadingCreateExperienceQueryOptions)

  if (error) return 'An error has occurred'

  return (
    <div>
      {loadingCreateExperience?.experience && (
        <div>
          <h1>{loadingCreateExperience.experience.title}</h1>
          <h1>{loadingCreateExperience.experience.maxAttendance}</h1>
          <h1>{loadingCreateExperience.experience.date}</h1>
        </div>
      )}
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