import type { RouteObject } from 'react-router-dom'
import Artist from '~/pages/Discover/Artist'
import HighQualityPlayList from '~/pages/Discover/HighQualityPlayList'
import LatestMusic from '~/pages/Discover/LatestMusic'
import PlayList from '~/pages/Discover/PlayList'
import Rank from '~/pages/Discover/Rank'
import Recommend from '~/pages/Discover/Recommend'

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
      path: 'artist',
      element: <Artist />,
    },
    {
      path: 'latestMusic',
      element: <LatestMusic />,
    },
  ],
} as RouteObject
