import { Icon } from '@iconify/react'
import cn from 'classnames'
import { usePlayer, useWindowDrag } from '~/hooks'

export default function NavbarLeft() {
  const onDrag = useWindowDrag()
  const { playerState, setShowDetail } = usePlayer()
  const { showDetail } = playerState
  return (
    <div
      className="item-center relative z-2 h-full w-sidebar flex justify-between"
      onMouseDown={onDrag}
    >
      <span
        className={cn(
          'ml-22 icon text-xl transition duration-300',
          showDetail ? 'opacity-100' : 'opacity-0',
        )}
        onClick={() => setShowDetail(false)}
      >
        <Icon icon="ep:arrow-down-bold" />
      </span>
    </div>
  )
}
