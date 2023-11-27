import { useMemoizedFn } from 'ahooks'
import { useAppDispatch, useAppSelector } from './store'
import { getSongDetail, getSongLyric, getSongPlayUrl } from '~/apis'
import getPlayInstance from '~/features/MusicPlayer/Player'
import {
  selectPlayer,
  setBuffered,
  setCurrentTime,
  setLoading,
  setLyric,
  setPlaying,
  setShowDetail,
  setSong,
  setSongUrl,
  setVolume,
} from '~/features/MusicPlayer/PlayerSlice'
import { songStore } from '~/modules/db'
import lyricParser from '~/modules/LyricParser'
import type { Song, SongLyric, SongPlayUrl } from '~/typing/Song'

const EXPIRE_TIME = 1000 * 60 * 60 * 24 * 3
let waitingId!: number

export function usePlayer() {
  const player = getPlayInstance()
  const playerState = useAppSelector(selectPlayer)

  const dispatch = useAppDispatch()

  const loadSongBySource = useMemoizedFn((id: number, src: string) => {
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
  })

  const loadSong = useMemoizedFn(async (id: number) => {
    waitingId = id
    if (playerState.song?.id === id)
      return
    dispatch(setLoading(true))
    const { song, address, lyric, error } = await fetchSongDetail(id)
    if (error)
      return
    // 避免多次点击导致同时加载多首歌曲，导致异步结果不一致
    if (waitingId !== song?.id)
      return
    // 初始化歌曲信息
    dispatch(setSongUrl(address!.url))
    dispatch(setSong(song!))
    dispatch(setPlaying(false))
    dispatch(setCurrentTime(0))
    dispatch(setBuffered(0))
    dispatch(setLyric(lyricParser(lyric!.lrc.lyric)))
    loadSongBySource(id, address!.url)
  })

  const togglePlay = useMemoizedFn(() => {
    if (!player.paused())
      player.pause()
    else
      player.play()
  })

  return {
    playerState,
    player,

    loadSong,
    togglePlay,
    play: useMemoizedFn(() => player.play()),
    pause: useMemoizedFn(() => player.pause()),
    volume: useMemoizedFn((value: number) => player.volume(value / 100)),
    mute: useMemoizedFn(() => player.mute()),
    seek: useMemoizedFn((seek: number) => player.seek(seek)),
    paused: useMemoizedFn(() => player.paused()),
    duration: useMemoizedFn(() => player.duration()),
    setShowDetail: useMemoizedFn((show: boolean) =>
      dispatch(setShowDetail(show)),
    ),
  }
}

type SongStoreItem = readonly [
  Song,
  SongPlayUrl,
  { lrc: SongLyric, yrc: SongLyric },
  number,
]

interface FetchSongDetailRes {
  song?: Song
  address?: SongPlayUrl
  lyric?: { lrc: SongLyric, yrc: SongLyric }
  error?: Error
}

async function fetchSongDetail(id: number): Promise<FetchSongDetailRes> {
  const res = (await songStore.get(String(id))) as SongStoreItem | null
  if (res && res[3] + EXPIRE_TIME >= Date.now()) {
    return {
      song: res[0],
      address: res[1],
      lyric: res[2],
    }
  }
  try {
    const [songRes, urlRes, lyricRes] = await Promise.all([
      getSongDetail({ ids: String(id) }),
      getSongPlayUrl({ id }),
      getSongLyric({ id }),
    ])
    let song!: Song
    let address!: SongPlayUrl
    let error!: Error
    let lyric!: { lrc: SongLyric, yrc: SongLyric }
    if (songRes.code === 200 && urlRes.code === 200 && lyricRes.code === 200) {
      song = songRes.songs[0]
      address = urlRes.data[0]
      lyric = { lrc: lyricRes.lrc, yrc: lyricRes.yrc }
      await songStore.set(String(id), [song, address, lyric, Date.now()])
    }
    else {
      error = new Error('获取歌曲信息失败')
    }
    return { song, address, lyric, error }
  }
  catch (e: any) {
    return { error: e }
  }
}
