import { createFileRoute } from '@tanstack/react-router'
import { ProfileCard } from '@/components/Custom/ProfileCard'

export const Route = createFileRoute('/profile')({
  component: ProfileCard
})