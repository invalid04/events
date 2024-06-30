import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/experiences/$eventId')({
  component: DetailRoute,
})

function DetailRoute() {
  return <div>Hello</div>
}