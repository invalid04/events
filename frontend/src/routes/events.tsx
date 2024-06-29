import { createFileRoute } from '@tanstack/react-router'
import { eventQueryOptions, loadingCreateExperienceQueryOptions, attendEventMutationOptions } from '@/lib/api'
import { useMutation, useQuery} from '@tanstack/react-query'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/events')({
  component: StyledEvents,
})

function StyledEvents() {
  const { isPending, error, data } = useQuery(eventQueryOptions)
  const { data: loadingCreateExperience } = useQuery(loadingCreateExperienceQueryOptions)
  const { mutate: attendEvent } = useMutation(attendEventMutationOptions)

  const handleAttendClick = async (eventId: number) => {
    try {
      await attendEvent({ eventId, userId: '1'})
    }
    catch (error) {
      console.error('Failed to attend event')
    }
  }

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
          <Card key={experience.id} className='p-2 max-w-sm mb-2 flex justify-between items-center'>
            <div className='flex flex-col justify-between'>
              <p>{experience.title}</p>
              <p>{experience.maxAttendance}</p>
              <p>{experience.date}</p>
              <Button
                onClick={() => handleAttendClick(experience.id)}
              >
                Attend
              </Button>
            </div>
          </Card>
        ))
      }
    </div>
  )
}