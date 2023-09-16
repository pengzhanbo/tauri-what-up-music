import cn from 'classnames'
import { IconArrowDown } from '~/components/Icons'
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
      <IconArrowDown
        className={cn(
          'ml-22 text-xl transition duration-300',
          showDetail ? 'opacity-100' : 'opacity-0',
        )}
        onClick={() => setShowDetail(false)}
      />
    </div>
  )
}
