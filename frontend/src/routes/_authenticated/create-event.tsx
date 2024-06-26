import { createFileRoute } from '@tanstack/react-router'
import CreateEvent from '@/components/Custom/CreateEvent'

export const Route = createFileRoute('/_authenticated/create-event')({
  component: CreateEvent
})