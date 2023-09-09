import { Icon } from '@iconify/react'
import { usePlayer } from '~/hooks'

function MusicControl() {
  const { togglePlay, playerState } = usePlayer()
  const { playing } = playerState
  return (
    <div className="flex-center">
      <span className="mr-7 icon cursor-pointer text-2xl text-text">
        <Icon icon="ph:heart" />
      </span>
      <span className="mr-7 icon cursor-pointer text-3xl text-brand-light">
        <Icon icon="basil:skip-prev-solid" />
      </span>
      <span
        className="mr-7 icon h-11 w-11 flex-center cursor-pointer rounded-full bg-brand text-xl text-white"
        onClick={togglePlay}
      >
        {playing ? <Icon icon="ph:pause-fill" /> : <Icon icon="ph:play-fill" />}
      </span>
      <span className="mr-7 icon cursor-pointer text-3xl text-brand">
        <Icon icon="basil:skip-next-solid" />
      </span>
      <span className="icon cursor-pointer text-xl text-text">
        <Icon icon="uiw:delete" />
      </span>
    </div>
  )
}

export default MusicControl
