import { createFileRoute } from '@tanstack/react-router'
import CreateEvent from '@/components/Custom/CreateEvent'

export const Route = createFileRoute('/create-event')({
  component: CreateEvent
})