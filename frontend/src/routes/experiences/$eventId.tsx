import React, { useEffect, useState } from 'react'
import { createFileRoute, useParams } from '@tanstack/react-router'

// Define the type for the experience data
interface Experience {
  id: number;
  title: string;
  // Add other fields as needed
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

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  // Display the experience details
  return (
    <div>
      hello {eventId}
      <p>{data?.experience.title}</p>
    </div>
  )
}

export default DetailRoute
