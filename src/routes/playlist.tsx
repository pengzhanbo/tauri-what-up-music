import type { RouteObject } from 'react-router-dom'
import PlaylistDetail from '~/pages/PlayList/Detail'

export default {
  path: '/playlist',
  children: [
    {
      path: 'detail',
      element: <PlaylistDetail />,
    },
  ],
} as RouteObject
