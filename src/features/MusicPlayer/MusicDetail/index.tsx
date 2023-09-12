import cn from 'classnames'
import { createPortal } from 'react-dom'
import MusicCover from './MusicCover'
import MusicCtrl from './MusicCtrl'
import MusicHeader from './MusicHeader'
import MusicLyric from './MusicLyric'
import { usePlayer } from '~/hooks'

export default function MusicDetail() {
  const { playerState } = usePlayer()
  const { song } = playerState
  return createPortal(
    <div
      className={cn(
        'top-navbar bottom-footer fixed z-10 w-full bg-navbar transition-all duration-300',
        playerState.showDetail ? 'translate-y-0' : 'translate-y-120%',
      )}
    >
      <div className="mx-auto w-800px">
        <div className="h-470px w-full flex">
          <div className="h-full flex flex-1 justify-end">
            <div className="mr-15">
              <MusicCover cover={song && song.al ? song.al.picUrl : ''} />
              <MusicCtrl />
            </div>
          </div>
          <div className="h-full flex flex-1 flex-col">
            <MusicHeader />
            <MusicLyric />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
