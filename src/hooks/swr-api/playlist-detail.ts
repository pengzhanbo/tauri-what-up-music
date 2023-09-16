import { useMemoizedFn } from 'ahooks'
import format from 'date-fns/format'
import { useMemo, useRef } from 'react'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import type {
  GetHighQualityPlayListParams,
  GetHighQualityPlayListResponse,
} from '~/apis'
import {
  getHighQualityPlayList,
  getHighQualityPlayListTags,
  getPlayListAllTrack,
  getPlayListDetail,
} from '~/apis'
import { formatDuration, numUnit, padZero } from '~/utils'

export const usePlayListHighQualityFirst = (cat: string | number) => {
  const { data, ...rest } = useSWR(
    ['discover/playlist/high-quality-1', cat],
    ([, cat]) => getHighQualityPlayList({ limit: 1, cat }),
  )

  const highQuality = useMemo(() => {
    const list = data?.playlists || []
    const highQuality = list[0]
    if (highQuality) {
      highQuality.coverImgUrl = `${
        highQuality.coverImgUrl.split('?')[0]
      }?param=600y600`
    }
    return highQuality
  }, [data])

  return { highQuality, ...rest }
}

export const usePlayListDetail = (id: number | undefined) => {
  const { data, ...rest } = useSWR(
    () => (id ? ['/playlist/detail+songs', { id }] : null),
    async ([, params]) => {
      const [detailRes, trackRes] = await Promise.all([
        getPlayListDetail(params),
        getPlayListAllTrack(params),
      ])
      return {
        playlist: detailRes.playlist,
        songs: trackRes.songs,
      }
    },
  )

  const playlist = useMemo(() => {
    return data?.playlist
      ? {
          ...data.playlist,
          createTimeString: format(
            new Date(data.playlist.createTime),
            'yyyy-MM-dd',
          ),
          subscribedCountString: numUnit(data.playlist.subscribedCount),
          shareCountString: numUnit(data.playlist.shareCount),
          playCountString: numUnit(data.playlist.playCount),
        }
      : null
  }, [data])

  const songs = useMemo(
    () =>
      (data?.songs || []).map((item, i) => ({
        ...item,
        sort: padZero(i + 1),
        ars: item.ar.map((item) => item.name).join('/'),
        duration: formatDuration(item.dt),
        tnsStr: item.tns && item.tns[0] ? item.tns[0] : '',
      })),
    [data],
  )

  return { playlist, songs, ...rest }
}

export const usePlayListHighQualityTags = () => {
  const { data, ...rest } = useSWR('discover/playlist/high-quality/tags', () =>
    getHighQualityPlayListTags(),
  )
  const tags = useMemo(() => data?.tags || [], [data])

  return { tags, ...rest }
}

export const usePlayListHighQuality = (cat: string) => {
  const isUpdating = useRef(true)
  const hasMore = useRef(true)
  const {
    data,
    setSize: _setSize,
    ...rest
  } = useSWRInfinite(
    (_, preData: GetHighQualityPlayListResponse) => {
      const params: GetHighQualityPlayListParams = { cat, limit: 50 }
      if (preData) params.before = preData.lasttime
      return ['discover/playlist/high-quality', params]
    },
    ([, params]) => getHighQualityPlayList(params),
    {
      onSuccess: (datas) => {
        isUpdating.current = false
        hasMore.current = datas?.[datas.length - 1]?.more || false
      },
    },
  )

  const playlist = useMemo(() => {
    const playlist: GetHighQualityPlayListResponse['playlists'] = []
    data?.forEach((item) => {
      playlist.push(...item.playlists)
    })
    return playlist.map((item) => ({
      ...item,
      playCount: numUnit(item.playCount),
      coverImgUrl: `${item.coverImgUrl.split('?')[0]}?param=600y600`,
    }))
  }, [data])

  const setSize = useMemoizedFn((...args: Parameters<typeof _setSize>) => {
    isUpdating.current = true
    _setSize(...args)
  })

  return { playlist, isUpdating, setSize, hasMore, ...rest }
}
