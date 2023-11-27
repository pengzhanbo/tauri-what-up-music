import cn from 'classnames'
import { useEffect, useState } from 'react'
import { usePlayer } from '~/hooks'

const step = 0.15

export default function MusicCover({ cover }: { cover: string }) {
  const [rotate, setRotate] = useState(0)
  const { player, playerState } = usePlayer()

  useEffect(() => {
    const interval = () => {
      if (!player.paused()) {
        setRotate((rotate) => {
          const next = rotate + step
          return next > 360 ? 0 : next
        })
        requestAnimationFrame(interval)
      }
    }

    const animation = () => interval()

    player.player.on('play', animation)
    return () => player.player.off('play', animation)
  }, [player])

  return (
    <div className="relative w-320px">
      <FiringPin active={playerState.playing} />
      <div className="mt-24 h-320px w-320px rounded-full bg-black/6 pt-10px">
        <div
          className="mx-auto h-300px w-300px origin-center overflow-hidden rounded-full bg-cover pt-40px will-change-transform"
          style={{
            backgroundImage: 'url(/bg-album.tiff)',
            transform: `rotate(${rotate}deg) translate3d(0, 0, 0)`,
          }}
        >
          <div
            className="mx-auto h-220px w-220px overflow-hidden border border-5px border-gray-900 rounded-full bg-cover"
            style={{ backgroundImage: `url(${cover})` }}
          >
          </div>
        </div>
      </div>
    </div>
  )
}

function FiringPin({ active }: { active: boolean }) {
  return (
    <div
      className={cn(
        'absolute left-50% z-2 h-70px w-140px origin-top-left transition-transform duration-800 -top-65px',
        active ? 'rotate-33' : 'rotate-0',
      )}
    >
      <div className="relative z-2 h-26px w-26px rounded-full bg-white pt-9px drop-shadow-lg -translate-50%">
        <span className="mx-auto block h-8px w-8px rounded-full bg-gray-200"></span>
      </div>
      <div className="absolute left-0 z-1 h-6px w-108px origin-top-left rotate-36.5 rounded-md bg-white drop-shadow-lg -top-3px"></div>
      <div className="absolute bottom-0 right-0 z-3 h-16px w-14px rounded-sm bg-white drop-shadow-lg -mt-4px">
        <span className="mx-auto mt-4px block h-1px w-10px bg-gray-300"></span>
        <span className="mx-auto mt-6px block h-1px w-10px bg-gray-300"></span>
      </div>
      <div className="absolute bottom-3px right-10px z-2 h-10px w-24px rounded-sm bg-white drop-shadow-lg">
        <span className="absolute right-0 top-2px block h-6px w-20px from-white/0 to-black/5 bg-gradient-to-r"></span>
      </div>
      <div className="absolute bottom-5px right-33px z-1 h-6px w-25px rounded-md bg-white drop-shadow-lg">
        <span className="absolute block h-6px w-3px bg-white -left-3px -top-3px -rotate-45"></span>
        <span className="absolute right-0 top-2px block h-2px w-7px rounded-sm bg-gray-500"></span>
      </div>
    </div>
  )
}
