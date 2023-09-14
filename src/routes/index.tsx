import type { RouteObject } from 'react-router-dom'
import { Navigate, useRoutes } from 'react-router-dom'
import discover from './discover'
import playlist from './playlist'

const routes: RouteObject[] = [
  discover,
  playlist,
  {
    path: '*',
    element: <Navigate to="/discover/recommend" />,
  },
]

function Router() {
  return useRoutes(routes)
}

export default Router
