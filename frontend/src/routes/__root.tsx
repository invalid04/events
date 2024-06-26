import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { type QueryClient } from '@tanstack/react-query'

import Navbar from '@/components/Custom/Navbar'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
})

function Root() {
  return (
    <>
      <div className='p-2 flex gap-2'>
        <Navbar />
      </div>
      <div className='p-2 m-auto'>
        <Outlet />
      </div>
    </>
  )
}