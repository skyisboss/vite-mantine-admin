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
        handle: { title: 'menu.home' },
        element: lazy(() => import('@/pages/home')),
      },
      {
        path: '/order',
        children: [
          {
            path: '',
            index: true,
            handle: { title: 'menu.order' },
            element: lazy(() => import('@/pages/order')),
          },
          {
            path: 'add',
            handle: { title: 'menu.order' },
            element: lazy(() => import('@/pages/order/add')),
          },
        ],
      },
      {
        path: '/marketing',
        children: [
          {
            path: '',
            index: true,
            handle: { title: 'menu.marketing' },
            element: lazy(() => import('@/pages/marketing')),
          },
          {
            path: 'create',
            index: true,
            handle: { title: 'menu.marketing' },
            element: lazy(() => import('@/pages/marketing/create')),
          },
        ],
      },
      {
        path: '/analyse',
        handle: { title: 'menu.analyse' },
        element: lazy(() => import('@/pages/analyse')),
      },
      {
        path: '/content',
        children: [
          {
            path: '',
            index: true,
            handle: { title: 'menu.content' },
            element: lazy(() => import('@/pages/content')),
          },
          {
            path: 'send',
            index: true,
            handle: { title: 'menu.marketing' },
            element: lazy(() => import('@/pages/content/SendContent')),
          },
        ],
      },
      {
        path: '/product',
        handle: { title: 'menu.product' },
        element: lazy(() => import('@/pages/product')),
      },
      {
        path: '/setting',
        handle: { title: 'menu.setting' },
        element: lazy(() => import('@/pages/setting')),
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
