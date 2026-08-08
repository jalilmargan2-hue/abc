
import { Outlet, createRootRoute } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import React from 'react';

const TanStackRouterDevtools = import.meta.env.PROD ? () => null : React.lazy(() => import('@tanstack/router-devtools').then((mod) => ({ default: mod.TanStackRouterDevtools })))

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <React.Suspense fallback={null}>
        <TanStackRouterDevtools position="bottom-right" />
      </React.Suspense>
    </>
  ),
})
