import MusicControl from './MusicControl'
import MusicExtra from './MusicExtra'
import MusicInfo from './MusicInfo'
import Progress from '~/components/Progress'
import { usePlayer } from '~/hooks'

function MusicPlayer() {
  const { playerState, seek } = usePlayer()
  const { currentTime, song, buffered } = playerState
  const total = song?.dt || 0
  const changeCurrentTime = (percent: number) => {
    seek((percent * total) / 1000)
  }
  return (
    <div className="h-full w-full">
      <Progress
        total={total}
        current={currentTime}
        preload={buffered}
        onChange={changeCurrentTime}
      />
      <div className="h-full flex-center">
        <MusicInfo />
        <MusicControl />
        <MusicExtra />
      </div>
    </div>
  )
}

export default MusicPlayer
