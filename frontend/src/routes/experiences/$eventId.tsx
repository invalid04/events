import { useEffect, useState } from 'react'
import { createFileRoute, useParams } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { attendEvent, userQueryOptions } from '@/lib/api'

// Define the type for the experience data
interface Experience {
  id: number
  date: string
  userId: string
  title: string
  desc: string
  time: string
  location: string
  maxAttendance: string
  createdAt: string | null
}

// Create a file route for the experience details
export const Route = createFileRoute('/experiences/$eventId')({
  component: DetailRoute,
})

// Component to display the experience details
function DetailRoute() {
  const { eventId } = useParams({ from: '/experiences/$eventId' })
  const [data, setData] = useState<{ experience: Experience } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Fetch the experience data
  useEffect(() => {
    const fetchExperience = async (id: string) => {
      try {
        const res = await fetch(`/api/experiences/${id}`)
        if (!res.ok) {
          throw new Error('network error')
        }
        const data = await res.json()
        setData(data)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchExperience(eventId)
  }, [eventId])

  // Fetch current user
  const { data: user, error: userError } = useQuery(userQueryOptions)

  // Mutation for attending an event
  const mutation = useMutation({
    mutationFn: ({ eventId, userId }: { eventId: number, userId: string }) => attendEvent({ eventId, userId }),
    onSuccess: (data) => {
      console.log('successfully attended event', data)
    },
    onError: (error: any) => {
      console.error('Error attending the event', error)
    }
  })

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (userError) return <div>Error fetching user info</div>

  // Handle attend button click
  const handleAttend = () => {
    if (user) {
      mutation.mutate({ eventId: parseInt(eventId), userId: user.user.id })
    }
  }

  // Display the experience details
  return (
    <div>
      hello {eventId}
      <p>{data?.experience.title}</p>
      <p>{data?.experience.desc}</p>
      <p>{data?.experience.date}</p>
      <p>{data?.experience.time}</p>
      <p>{data?.experience.location}</p>
      <Button
        onClick={handleAttend}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'Attending...' : 'Attend Event'}
      </Button>
    </div>
  )
}

export default DetailRoute
