import React from 'react'
import { RouteObject } from 'react-router-dom'
import LayoutBase from '@/layout'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <LayoutBase />,
    children: [
      {
        path: '',
        handle: { title: 'menu.dashboard' },
        element: lazy(() => import('@/pages/home')),
      },
    ],
  },
  {
    path: '/login',
    handle: { title: 'login.pageTitle' },
    element: lazy(() => import('@/pages/user/login')),
  },
]

function lazy(callback: () => Promise<{ default: React.ComponentType<any> }>) {
  const LazyComp = React.lazy(callback)

  return (
    // <React.Suspense fallback={<Loader size={30} />}>
    <React.Suspense>
      <LazyComp />
    </React.Suspense>
  )
}

export default routes
