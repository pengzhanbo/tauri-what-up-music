import { useMemoizedFn } from 'ahooks'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './store'
import {
  isFirstHistory,
  isLatestHistory,
  pushHistory,
  updateCurrentHistoryIndex,
} from '~/features/Navbar/navigateSlice'

export const usePageNavigate = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isFirst = useAppSelector(isFirstHistory)
  const isLatest = useAppSelector(isLatestHistory)
  const historyIndex = useAppSelector(
    (state) => state.navigate.currentHistoryIndex,
  )
  const history = useAppSelector((state) => state.navigate.history)

  const go = useMemoizedFn((path: string) => {
    dispatch(pushHistory(path))
    navigate(path)
  })
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

  const forwardNavigate = useMemoizedFn(() => {
    if (isLatest) return
    let index = historyIndex
    index++
    if (index > history.length - 1) {
      index = history.length - 1
    }
    dispatch(updateCurrentHistoryIndex(index))
    navigate(history[index])
  })

  const backNavigate = useMemoizedFn(() => {
    if (isFirst) return
    let index = historyIndex
    index--
    if (index < 0) {
      index = 0
    }
    dispatch(updateCurrentHistoryIndex(index))
    navigate(history[index])
  })

  return {
    goHome,
    goDiscoverPlaylist,
    goDiscoverHighQuality,
    goDiscoverRank,
    goDiscoverArtist,
    goDiscoverLatestMusic,
    goPlayListDetail,

    isFirstHistory: isFirst,
    isLatestHistory: isLatest,
    forwardNavigate,
    backNavigate,
    navigate: go,
  }
}
