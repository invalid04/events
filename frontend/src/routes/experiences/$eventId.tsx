import { eventByIdQueryOptions } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/experiences/$eventId')({
  component: DetailRoute,
})

function DetailRoute() {

  const { eventId } = useParams({ from: '/experiences/$eventId' })
  const parsedEventId = parseInt(eventId)

  const { isPending, error, data } = useQuery(eventByIdQueryOptions(parsedEventId))

  if (isPending) return '...'
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      hello
    </div>
  )
}