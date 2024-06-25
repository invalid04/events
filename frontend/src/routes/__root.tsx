import { createRootRoute, Outlet } from '@tanstack/react-router'
import Navbar from '@/components/Custom/Navbar'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Navbar />
      </div>
      <Outlet />
    </>
  ),
})
