import type { RouteObject } from 'react-router-dom'
import HighQualityPlayList from '~/pages/Discover/HighQualityPlayList'
import LastMusic from '~/pages/Discover/LastMusic'
import PlayList from '~/pages/Discover/PlayList'
import Rank from '~/pages/Discover/Rank'
import Recommend from '~/pages/Discover/Recommend'
import Singer from '~/pages/Discover/Singer'

export default {
  path: '/discover',
  children: [
    {
      path: 'recommend',
      element: <Recommend />,
      index: true,
    },
    {
      path: 'playList',
      element: <PlayList />,
    },
    {
      path: 'playList/highQuality',
      element: <HighQualityPlayList />,
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
