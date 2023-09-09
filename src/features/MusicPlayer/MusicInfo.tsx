import Artists from '~/components/Artists'
import LazyImage from '~/components/LazyImage'
import { usePlayer } from '~/hooks'
import { formatDuration } from '~/utils'

function MusicInfo() {
  const { playerState } = usePlayer()
  const { song, currentTime } = playerState
  const ct = formatDuration(currentTime || 0)
  const dt = formatDuration(song?.dt || 0)
  return (
    <div className="w-1px flex flex-1 items-center pl-3">
      <div className="h-12 w-12 overflow-hidden rounded-md bg-gray-300">
        {song?.al && (
          <LazyImage src={song.al.picUrl} className="h-full w-full" />
        )}
      </div>
      <div className="ml-2 flex-1">
        <div className="flex items-center">
          <p className="m-0 text-text">{song?.name ? song.name : '歌曲名称'}</p>
          <span className="mx-1 text-text-light">-</span>
          {song?.ar ? (
            <Artists artists={song?.ar} />
          ) : (
            <p className="m-0 text-12px text-text-light">歌曲作者</p>
          )}
        </div>
        <div className="mt-1 flex items-center text-12px text-text-light">
          <p>{ct}</p>
          <span className="mx-2">/</span>
          <p>{dt}</p>
        </div>
      </div>
    </div>
  )
}

export default MusicInfo
