import { useMemoizedFn } from 'ahooks'
import cn from 'classnames'
import Artists from '~/components/Artists'
import { IconArrowDownSharp, IconArrowUpSharp } from '~/components/Icons'
import LazyImage from '~/components/LazyImage'
import { usePlayer } from '~/hooks'
import { formatDuration } from '~/utils'

function MusicInfo() {
  const { playerState, setShowDetail } = usePlayer()
  const { song, currentTime, showDetail } = playerState
  const ct = formatDuration(currentTime || 0)
  const dt = formatDuration(song?.dt || 0)

  const toggle = useMemoizedFn(() => setShowDetail(!showDetail))
  const iconClasses = cn('transition', showDetail ? 'rotate-180' : 'rotate-0')

  return (
    <div className="w-1px flex flex-1 items-center pl-3">
      <div className="group relative h-12 w-12 overflow-hidden rounded-md bg-gray-300">
        {song?.al && (
          <LazyImage src={song.al.picUrl} className="h-full w-full" />
        )}
        <div
          className="absolute left-0 top-0 z-1 h-full w-full flex-center flex-col cursor-pointer bg-black/30 py-1 text-2xl text-white opacity-0 backdrop-blur-5px transition group-hover:opacity-100"
          onClick={toggle}
        >
          <IconArrowUpSharp className={iconClasses} />
          <IconArrowDownSharp className={iconClasses} />
        </div>
      </div>
      <div className="ml-2 flex-1">
        <div className="flex items-center">
          <p className="m-0 cursor-default text-text" onClick={toggle}>
            {song?.name ? song.name : '歌曲名称'}
          </p>
          <span className="mx-1 text-text-light">-</span>
          {song?.ar
            ? (
              <Artists artists={song?.ar} />
              )
            : (
              <p className="m-0 text-12px text-text-light">歌曲作者</p>
              )}
        </div>
        <div
          className="mt-1 flex cursor-default items-center text-12px text-text-light"
          onClick={toggle}
        >
          <p>{ct}</p>
          <span className="mx-2">/</span>
          <p>{dt}</p>
        </div>
      </div>
    </div>
  )
}

export default MusicInfo
