import useSWR from 'swr'
import { getPlayListAllTrack, getPlayListDetail } from '~/apis'

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

  const playlist = data?.playlist
  const songs = data?.songs || []

  return { playlist, songs, ...rest }
}
