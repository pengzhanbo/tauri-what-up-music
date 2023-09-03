import { Icon } from '@iconify/react'
import NavLink from './NavLink'
import SearchInput from '~/components/SearchInput'
import { useWindowDrag } from '~/hooks'

export default function Navbar() {
  const onDrag = useWindowDrag()
  return (
    <>
      <div
        className="flex flex-1 cursor-default items-center justify-start"
        onMouseDown={onDrag}
      >
        <NavLink link="/discover/recommend" text="个性推荐" active />
        <NavLink link="/discover/playList" text="歌单" />
        <NavLink link="/discover/rank" text="排行榜" />
        <NavLink link="/discover/singer" text="歌手" />
        <NavLink link="/discover/lastMusic" text="最新音乐" />
      </div>
      <div className="flex-center pr-4" onMouseDown={onDrag}>
        <SearchInput></SearchInput>
        <div className="ml-2 flex-center -mr-3">
          <div className="icon mx-3 cursor-pointer select-none text-xl">
            <Icon icon="ep:setting" />
          </div>
          <div className="relative icon mx-3 cursor-pointer select-none text-xl">
            <Icon icon="solar:letter-linear" />
            <span className="absolute inline-block h-4 rounded-4 bg-red-600 px-1 py-1px text-12px leading-12px text-white -right-110% -top-30%">
              99+
            </span>
          </div>
          <div className="icon mx-3 cursor-pointer select-none text-xl">
            <Icon icon="icon-park-outline:theme" />
          </div>
          <div className="icon mx-3 cursor-pointer select-none text-xl">
            <Icon icon="ph:copy" />
          </div>
        </div>
      </div>
    </>
  )
}
