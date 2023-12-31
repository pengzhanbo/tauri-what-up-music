import { Icon } from '@iconify/react'
import cn from 'classnames'
import NavLink from './NavLink'
import SearchInput from '~/components/SearchInput'
import { usePlayer, useWindowDrag } from '~/hooks'

export default function Navbar() {
  const onDrag = useWindowDrag()
  const { playerState } = usePlayer()
  return (
    <>
      <div
        className={cn(
          'relative z-2 flex flex-1 cursor-default items-center justify-start transition',
          playerState.showDetail ? 'opacity-0' : 'opacity-100',
        )}
        onMouseDown={onDrag}
      >
        <NavLink link="/discover/recommend" text="个性推荐" />
        <NavLink link="/discover/playList" text="歌单" />
        <NavLink link="/discover/rank" text="排行榜" />
        <NavLink link="/discover/artist" text="歌手" />
        <NavLink link="/discover/latestMusic" text="最新音乐" />
      </div>
      <div className="relative z-2 flex-center pr-4" onMouseDown={onDrag}>
        <SearchInput />
        <div className="ml-2 flex-center -mr-3">
          <div className="mx-3 icon cursor-pointer select-none text-xl">
            <Icon icon="ep:setting" />
          </div>
          <div className="relative mx-3 icon cursor-pointer select-none text-xl">
            <Icon icon="solar:letter-linear" />
            <span className="absolute inline-block h-4 rounded-4 bg-red-600 px-1 py-1px text-12px leading-12px text-white -right-110% -top-30%">
              99+
            </span>
          </div>
          <div className="mx-3 icon cursor-pointer select-none text-xl">
            <Icon icon="icon-park-outline:theme" />
          </div>
          <div className="mx-3 icon cursor-pointer select-none text-xl">
            <Icon icon="ph:copy" />
          </div>
        </div>
      </div>
    </>
  )
}
