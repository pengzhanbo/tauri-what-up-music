import { useMemo } from 'react'
import useSWR from 'swr'
import type { GetNewAlbumListParams } from '~/apis'
import { getNewAlbumList, getNewTopSong } from '~/apis'
import { formatDuration } from '~/utils'

export function useTopSongs(area: string) {
  const { data, ...rest } = useSWR(
    ['discover/latestMusic/top-songs', area],
    ([, type]) => getNewTopSong({ type }),
  )

  const topSongs = useMemo(
    () =>
      (data?.data || []).map((item, i) => ({
        id: item.id,
        name: item.name,
        picUrl: item.album.picUrl,
        duration: formatDuration(item.duration),
        artists: item.artists,
        trans: (item.transNames || []).join('/'),
        mvid: item.mvid,
        album: item.album,
        no: i + 1 < 10 ? `0${i + 1}` : i + 1,
      })),
    [data],
  )

  return { topSongs, ...rest }
}

export function useTopAlbumList(params: GetNewAlbumListParams) {
  const { data, ...rest } = useSWR(
    () => ['discover/latestMusic/top-albums', params],
    ([, params]) => getNewAlbumList(params),
  )

  const weekData = data?.weekData || []
  const monthData = data?.monthData || []

  return { weekData, monthData, ...rest }
}
