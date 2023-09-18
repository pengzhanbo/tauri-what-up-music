import { useMemoizedFn } from 'ahooks'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { pushHistory } from './history'

export const usePageNavigate = () => {
  const navigate = useNavigate()

  const go = useCallback(
    (path: string) => {
      pushHistory(path)
      navigate(path)
    },
    [navigate],
  )
  const goHome = useMemoizedFn(() => go('/discover/recommend'))
  const goDiscoverPlaylist = useMemoizedFn(() => go('/discover/playlist'))
  const goDiscoverHighQuality = useMemoizedFn(() =>
    go('/discover/playlist/highQuality'),
  )
  const goDiscoverRank = useMemoizedFn(() => go('/discover/rank'))
  const goDiscoverArtist = useMemoizedFn(() => go('/discover/artist'))
  const goDiscoverLatestMusic = useMemoizedFn(() => go('/discover/latestMusic'))

  const goPlayListDetail = useMemoizedFn((id: number) =>
    go(`/playlist/detail?id=${id}`),
  )

  return {
    goHome,
    goDiscoverPlaylist,
    goDiscoverHighQuality,
    goDiscoverRank,
    goDiscoverArtist,
    goDiscoverLatestMusic,
    goPlayListDetail,
  }
}
