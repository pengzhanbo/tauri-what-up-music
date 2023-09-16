/**
 * 推荐歌单
 */
import { Icon } from '@iconify/react'
import { useMemo } from 'react'
import useSwr from 'swr'
import Content from './Content'
import { getRecommendSongList, getRecommendSongOfDay } from '~/apis'
import LazyImage from '~/components/LazyImage'
import PlayerPlayFill from '~/components/PlayerPlayFill'
import Rectangle from '~/components/Rectangle'
import { numUnit } from '~/utils'

export default function SongList() {
  const { data } = useSwr(
    ['discover/recommend/song-list', { limit: 9 }],
    ([, params]) => getRecommendSongList(params),
  )
  const songList = useMemo(
    () =>
      (data?.result || []).map((item) => ({
        ...item,
        playCount: numUnit(item.playCount),
      })),
    [data],
  )
  return (
    <Content title="推荐歌单">
      <div className="grid grid-cols-5 gap-5">
        <SongOfDay />
        {songList.map((item) => (
          <section className="pb-6" key={item.id}>
            <Rectangle className="group cursor-pointer overflow-hidden border rounded-md">
              <p className="absolute right-0 top-0 flex-center pr-2 text-sm text-white">
                <span className="relative top-2px mr-1 icon">
                  <Icon icon="iconamoon:player-play" />
                </span>
                <span>{item.playCount}</span>
              </p>
              <LazyImage className="h-full w-full" src={item.picUrl} />
              <PlayerPlayFill position="rb" blur="light" size="small" />
            </Rectangle>
            <p className="line-clamp-2 mt-1 text-13px leading-relaxed text-text-dark">
              <span className="cursor-pointer">{item.name}</span>
            </p>
          </section>
        ))}
      </div>
    </Content>
  )
}

function SongOfDay() {
  const { isLoading, data } = useSwr('discover/recommend/song-of-day', () =>
    getRecommendSongOfDay(),
  )
  if (isLoading) return null
  const songImg = data?.data.dailySongs[0].al.picUrl || ''
  const day = new Date().getDate()
  return (
    <section className="pb-4">
      <Rectangle className="group cursor-pointer overflow-hidden border rounded-md">
        <p className="absolute left-0 top-0 z-3 w-full bg-black bg-opacity-50 px-2 py-2 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          根据您的音乐口味生成每日更新
        </p>
        {songImg && (
          <div className="h-full w-full">
            <div className="absolute left-0 top-0 h-full w-full bg-red-800/30 backdrop-blur-md"></div>
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `url(${songImg})`,
                backgroundSize: 'cover',
              }}
            ></div>
          </div>
        )}
        <div className="absolute left-0 top-0 z-2 h-full w-full flex">
          <span className="m-auto icon text-8xl text-white">
            <Icon icon={`arcticons:calendar-${day}`} />
          </span>
        </div>
        <PlayerPlayFill position="rb" blur="light" size="small" />
      </Rectangle>
      <p className="mt-1 text-13px leading-relaxed text-text-dark">
        <span className="cursor-pointer">每日歌曲推荐</span>
      </p>
    </section>
  )
}
