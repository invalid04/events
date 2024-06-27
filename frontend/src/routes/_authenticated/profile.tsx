import { createFileRoute } from '@tanstack/react-router'

import { ProfileCard } from '@/components/Custom/ProfileCard'
import { MyEventCard } from '@/components/Custom/MyEventCard'

export const Route = createFileRoute('/_authenticated/profile')({
  component: ProfilePage
})

function ProfilePage() {
  return (
    <div>
      <ProfileCard />
      <MyEventCard />
    </div>
  )
}