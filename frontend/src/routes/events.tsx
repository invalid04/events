import { createFileRoute } from '@tanstack/react-router'
import { eventQueryOptions, loadingCreateExperienceQueryOptions } from '@/lib/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

import { deleteExperience } from '@/lib/api'

import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { Card } from '@/components/ui/card'

import { toast } from 'sonner'

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
          <Card key={experience.id} className='p-2 max-w-sm mb-2 flex justify-between items-center'>
            <div className='flex flex-col justify-between'>
              <p>{experience.title}</p>
              <p>{experience.maxAttendance}</p>
              <p>{experience.date}</p>
            </div>
            <ExperienceDeleteButton id={experience.id} />
          </Card>
        ))
      }
    </div>
  )
}

function ExperienceDeleteButton({id} : { id: number }) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteExperience,
    onError: () => {
        toast('Error', {
          description: 'Failed to delete experience'
        })
    },
    onSuccess: () => {
      toast('Success', {
        description: `Experience has been deleted`
      })

      queryClient.setQueryData(
        eventQueryOptions.queryKey,
        (existingExperiences) => ({
          ...existingExperiences,
          experiences: existingExperiences!.experiences.filter((e) => e.id !== id),
        })
      )

    }
  })

  return (
    <Button
      disabled={mutation.isPending}
      onClick={() => mutation.mutate({ id })}
      variant='outline'
    >
      <Trash />
    </Button>
  )
}