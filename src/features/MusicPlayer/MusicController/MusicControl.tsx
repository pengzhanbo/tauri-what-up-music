import { useMemo } from 'react'
import {
  IconDelete,
  IconHeart,
  IconPause,
  IconPlay,
  IconPlayNext,
  IconPlayPrev,
} from '~/components/Icons'
import { usePlayer } from '~/hooks'

function MusicControl() {
  const { togglePlay, playerState } = usePlayer()
  const { playing } = playerState

  const IconStatus = useMemo(() => (playing ? IconPause : IconPlay), [playing])
  return (
    <div className="flex-center">
      <IconHeart className="mr-7 cursor-pointer text-2xl text-text" />
      <IconPlayPrev className="mr-7 cursor-pointer text-3xl text-brand-light" />
      <IconStatus
        className="mr-7 h-11 w-11 flex-center cursor-pointer rounded-full bg-brand text-xl text-white"
        onClick={togglePlay}
      />
      <IconPlayNext className="mr-7 icon cursor-pointer text-3xl text-brand" />
      <IconDelete className="cursor-pointer text-xl text-text" />
    </div>
  )
}

export default MusicControl
