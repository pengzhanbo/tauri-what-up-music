import { useAppDispatch, useAppSelector } from './store'
import { getSongDetail, getSongPlayUrl } from '~/apis'
import getPlayInstance from '~/features/MusicPlayer/Player'
import {
  selectPlayer,
  setBuffered,
  setCurrentTime,
  setLoading,
  setPlaying,
  setSong,
  setSongUrl,
  setVolume,
} from '~/features/MusicPlayer/PlayerSlice'
import { songStore } from '~/modules/db'
import type { Song, SongPlayUrl } from '~/typing/Song'

const EXPIRE_TIME = 1000 * 60 * 60 * 24 * 3
let waitingId!: number

export const usePlayer = () => {
  const player = getPlayInstance()
  const playerState = useAppSelector(selectPlayer)

  const dispatch = useAppDispatch()

  const loadSongBySource = (id: number, src: string) => {
    dispatch(setLoading(true))

    player.create(id, {
      // source: `https://music.163.com/song/media/outer/url?id=${id}.mp3`,
      source: src,
      onload: () => dispatch(setLoading(false)),
      onerror: () => {
        requestAnimationFrame(() => {
          loadSongBySource(
            id,
            `https://music.163.com/song/media/outer/url?id=${id}.mp3`,
          )
        })
      },
      onpause: () => dispatch(setPlaying(false)),
      onplay: () => {
        dispatch(setPlaying(true))
      },
      onprogress(current) {
        dispatch(setBuffered(current * 1000))
      },
      ontimeupdate: () => dispatch(setCurrentTime(player.seek() * 1000)),
      onvolume: (value: number) => dispatch(setVolume(value * 100)),
      // onmute: () => dispatch(setVolume(0)),
      onend: () => dispatch(setPlaying(false)),
    })
    player.play()
  }

  const loadSong = async (id: number) => {
    waitingId = id
    if (playerState.song?.id === id) return
    dispatch(setLoading(true))
    const { song, url, error } = await fetchSongDetail(id)
    if (error) return
    // 避免多次点击导致同时加载多首歌曲，导致异步结果不一致
    if (waitingId !== song?.id) return
    // 初始化歌曲信息
    dispatch(setSongUrl(url!.url))
    dispatch(setSong(song!))
    dispatch(setPlaying(false))
    dispatch(setCurrentTime(0))
    dispatch(setBuffered(0))
    loadSongBySource(id, url!.url)
  }

  const togglePlay = () => {
    if (!player.paused()) {
      player.pause()
    } else {
      player.play()
    }
  }

  return {
    playerState,
    player,

    loadSong,
    togglePlay,
    play: () => player.play(),
    pause: () => player.pause(),
    volume: (value: number) => player.volume(value / 100),
    mute: () => player.mute(),
    seek: (seek: number) => player.seek(seek),
    paused: () => player.paused(),
    duration: () => player.duration(),
  }
}

type SongStoreItem = [Song, SongPlayUrl, number]

interface FetchSongDetailRes {
  song?: Song
  url?: SongPlayUrl
  error?: Error
}

async function fetchSongDetail(id: number): Promise<FetchSongDetailRes> {
  const res = (await songStore.get(String(id))) as SongStoreItem | null
  if (res && res[2] + EXPIRE_TIME >= Date.now()) {
    return {
      song: res[0],
      url: res[1],
    }
  }
  try {
    const [songRes, urlRes] = await Promise.all([
      getSongDetail({ ids: String(id) }),
      getSongPlayUrl({ id }),
    ])
    let song!: Song
    let url!: SongPlayUrl
    let error!: Error
    if (songRes.code === 200 && urlRes.code === 200) {
      song = songRes.songs[0]
      url = urlRes.data[0]
      await songStore.set(String(id), [song, url, Date.now()])
    } else {
      error = new Error('获取歌曲信息失败')
    }
    return { song, url, error }
  } catch (e: any) {
    return { error: e }
  }
}
