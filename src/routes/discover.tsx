import type { RouteObject } from 'react-router-dom'
import LastMusic from '~/pages/Discover/LastMusic'
import Rank from '~/pages/Discover/Rank'
import Recommend from '~/pages/Discover/Recommend'
import Singer from '~/pages/Discover/Singer'
import SongList from '~/pages/Discover/SongList'

export default {
  path: '/discover',
  children: [
    {
      path: 'recommend',
      element: <Recommend />,
      index: true,
    },
    {
      path: 'songList',
      element: <SongList />,
    },
    {
      path: 'rank',
      element: <Rank />,
    },
    {
      path: 'singer',
      element: <Singer />,
    },
    {
      path: 'lastMusic',
      element: <LastMusic />,
    },
  ],
} as RouteObject
