import cn from 'classnames'
import { usePlayer } from '~/hooks'

export default function MusicHeader() {
  const { playerState } = usePlayer()
  const song = playerState.song

  if (!song)
    return null

  const iconStyle = cn(
    'relative ml-2 inline-block h-22px border border-brand-lighter rounded px-2 text-14px font-500 leading-20px text-brand -top-3px',
  )

  return (
    <div className="pt-4">
      <h2 className="m-0 mt-4 text-22px leading-8">
        <span className="select-auto font-500 text-text-dark">{song.name}</span>
        {song.mv > 0 && <span className={iconStyle}>MV</span>}
        {/* <span className={iconStyle}>极高音质</span> */}
      </h2>
      {song.alias && song.alias[0] && (
        <p className="pt-3 text-text-dark">{song.alias[0]}</p>
      )}
      <div className="flex-center pt-3 text-13px">
        <p className="line-clamp-1 w-1px flex flex-1 items-center">
          <span className="select-auto pr-2 text-text-light-dark">专辑:</span>
          <span className="line-clamp-1 w-1px flex-1 select-auto pr-2 text-blue-4">
            {song.al?.name}
          </span>
        </p>
        <p className="w-1px flex flex-1 items-center">
          <span className="select-auto pr-2 text-text-light-dark">歌手:</span>
          <span className="line-clamp-1 w-1px flex-1 select-auto pr-2 text-blue-4">
            {song.ar?.map(item => item.name).join('/')}
          </span>
        </p>
        <p className="line-clamp-1 w-1px flex flex-1 items-center">
          <span className="select-auto pr-2 text-text-light-dark">来源:</span>
          <span className="line-clamp-1 w-1px flex-1 select-auto pr-2 text-blue-4">
            {song.al?.name}
          </span>
        </p>
      </div>
    </div>
  )
}
