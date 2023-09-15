import { useMemo } from 'react'
import useSwr from 'swr'
import { getAllTopList, getPlayListDetail } from '~/apis'

export const useRankTopList = () => {
  const { isLoading, data } = useSwr('discover/rank/all/topList', () =>
    getAllTopList(),
  )
  const list = data?.list || []
  const officialList = useMemo(
    () => list.filter((item) => item.ToplistType),
    [list],
  )
  const globalList = useMemo(
    () => list.filter((item) => !item.ToplistType),
    [list],
  )

  return { isLoading, officialList, globalList }
}

export const usePlayListShortDetail = (id: number) => {
  const { isLoading, data } = useSwr(['play-list/detail', id], ([, id]) =>
    getPlayListDetail({ id }),
  )

  const rankList = useMemo(() => {
    const playlist = data?.playlist || { trackIds: [], tracks: [] }
    const { trackIds = [], tracks = [] } = playlist
    return tracks.slice(0, 5).map((item, i) => {
      const ids = trackIds[i]!
      return {
        id: item.id,
        name: item.name,
        coverImgUrl: item.al.picUrl,
        tns: item.tns ? `(${item.tns.join('/')})` : '',
        artist: item.ar.map((ar) => ar.name).join('/'),
        ratio: ids.ratio,
        lr: ids.lr || i,
        uid: ids.uid,
      }
    })
  }, [data])

  return { isLoading, rankList }
}
