import MusicControl from './MusicControl'
import MusicExtra from './MusicExtra'
import MusicInfo from './MusicInfo'
import Progress from '~/components/Progress'

function MusicPlayer() {
  return (
    <div className="h-full w-full">
      <Progress total={100} current={50} />
      <div className="flex-center h-full">
        <MusicInfo />
        <MusicControl />
        <MusicExtra />
      </div>
    </div>
  )
}

export default MusicPlayer
