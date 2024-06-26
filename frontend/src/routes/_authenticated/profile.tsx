import { createFileRoute } from '@tanstack/react-router'
import { ProfileCard } from '@/components/Custom/ProfileCard'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_authenticated/profile')({
  component: ProfilePage
})

function Logout() {
  return (
    <Button asChild>
      <a href='/api/logout'>Logout</a>
    </Button>
  )
}

function ProfilePage() {
  return (
    <div className='flex gap-2 items-start'>
      <ProfileCard />
      <Logout />
    </div>
  )
}