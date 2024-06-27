import { Card, CardTitle, CardContent, CardHeader, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { myEventQueryOptions } from "@/lib/api";

import { deleteExperience } from '@/lib/api'

import { Trash } from 'lucide-react'

import { toast } from 'sonner'

export function MyEventCard() {

    const { isPending, error, data } = useQuery(myEventQueryOptions)

    if (isPending) return '...'
    if (error) return 'error'

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.experiences.map((experience) => (
                <Card key={experience.id}>
                    <CardHeader>
                        <CardTitle>Title: {experience.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Max Attendance: {experience.maxAttendance}</p>
                        <p>Date: {experience.date}</p>
                    </CardContent>
                    <CardFooter>
                        <ExperienceDeleteButton id={experience.id} />
                    </CardFooter>
                </Card>
            ))}
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
          myEventQueryOptions.queryKey,
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
        className='w-full'
      >
        <Trash />
      </Button>
    )
  }