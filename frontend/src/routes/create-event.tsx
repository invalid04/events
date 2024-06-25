import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create-event')({
  component: () => <div>Hello /create-event!</div>
})