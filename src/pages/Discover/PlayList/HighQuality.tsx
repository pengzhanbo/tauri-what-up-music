/**
 * 精品歌单入口
 */
import { Icon } from '@iconify/react'
import useSwr from 'swr'
import { getHighQualityPlayList } from '~/apis'

export default function HighQuality({ cat = '' }: { cat?: string | number }) {
  const { isLoading, data } = useSwr(
    ['discover/playlist/high-quality-1', cat],
    ([, cat]) => getHighQualityPlayList({ limit: 1, cat }),
  )
  if (isLoading) return <div className="h-170px w-full"></div>
  const list = data?.playlists || []
  const item = list[0]
  if (!item) return null

  return (
    <div
      className="relative h-170px w-full cursor-pointer overflow-hidden rounded-md bg-cover bg-center"
      style={{ backgroundImage: `url(${item.coverImgUrl})` }}
    >
      <div className="absolute left-0 top-0 z-0 h-full w-full bg-black/30 backdrop-blur-50"></div>
      <div className="relative z-1 h-full w-full flex-center px-4">
        <div
          className="h-140px w-140px rounded bg-cover"
          style={{ backgroundImage: `url(${item.coverImgUrl})` }}
        ></div>
        <div className="flex-1 pl-4 text-white">
          <div className="flex pb-6">
            <p className="text-king border-king h-8 flex-center border rounded-8 px-4 leading-8">
              <span className="icon">
                <Icon icon="fa6-regular:chess-queen" />
              </span>
              <span className="pl-2">精品歌单</span>
            </p>
          </div>
          <p className="line-clamp-1 pb-2 text-16px">{item.name}</p>
          <p className="line-clamp-2 text-sm text-text-lighter">
            {item.copywriter}
          </p>
        </div>
      </div>
    </div>
  )
}
