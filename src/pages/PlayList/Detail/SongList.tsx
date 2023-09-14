import { Icon } from '@iconify/react/dist/iconify.js'
import cn from 'classnames'
import { forwardRef } from 'react'
import type { Song } from '~/typing/Song'
import { formatDuration, padZero } from '~/utils'

export default forwardRef<HTMLDivElement, SongListProps>(function SongList(
  { songs, show },
  ref,
) {
  return (
    <div
      className={cn('songs-container pb-2', show ? 'block' : 'hidden')}
      ref={ref}
    >
      <div className="h-35px flex items-center px-8 text-sm leading-34px text-text-light">
        <div className="h-full w-10.44%"></div>
        <div className="h-full w-1px flex-1">音乐标题</div>
        <div className="h-full w-18.15%">歌手</div>
        <div className="h-full w-26.2%">专辑</div>
        <div className="h-full w-35px">时长</div>
      </div>
      {songs.map((item, i) => (
        <div
          key={item.id}
          className="h-35px flex items-center px-8 text-sm leading-34px even:bg-light-200 hover:bg-light-400!"
        >
          <div className="h-full w-10.44% flex items-center justify-between pr-3">
            <span className="inline-block w-20px text-text-light">
              {padZero(i + 1)}
            </span>
            <span className="icon cursor-pointer text-15px text-text-light hover:text-text-light-dark">
              <Icon icon="ph:heart" />
            </span>
            <span className="icon cursor-pointer text-15px text-text-light hover:text-text-light-dark">
              <Icon icon="bi:download" />
            </span>
          </div>
          <div className="line-clamp-1 h-full w-1px flex-1 pr-2 text-text-dark">
            <span className="cursor-default">{item.name}</span>
            {item.tns && item.tns[0] && (
              <span className="text-text-light">({item.tns[0]})</span>
            )}
          </div>
          <div className="line-clamp-1 h-full w-18.15% pr-2 text-text-light-dark">
            {item.ar.map((item) => item.name).join('/')}
          </div>
          <div className="line-clamp-1 h-full w-26.2% pr-2 text-text-light-dark">
            {item.al.name}
          </div>
          <div className="h-full w-35px text-text-light">
            {formatDuration(item.dt)}
          </div>
        </div>
      ))}
    </div>
  )
})

export interface SongListProps {
  songs: Song[]
  show: boolean
}
