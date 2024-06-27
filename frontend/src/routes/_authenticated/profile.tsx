import { createFileRoute } from '@tanstack/react-router'

import { ProfileCard } from '@/components/Custom/ProfileCard'
import { MyEventCard } from '@/components/Custom/MyEventCard'

export const Route = createFileRoute('/_authenticated/profile')({
  component: ProfilePage
})

function ProfilePage() {
  return (
      <div className="flex flex-col">
          <div className="mb-6 md:mb-0 md:mr-6 md:w-1/3">
              <ProfileCard />
          </div>
          <div className="flex-1">
              <MyEventCard />
          </div>
      </div>
  );
}

