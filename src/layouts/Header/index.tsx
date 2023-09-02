import Navbar from '~/features/Navbar'
import { useWindowDrag } from '~/hooks'

export default function Header() {
  const onDrag = useWindowDrag()
  return (
    <div
      className="fixed z-10 h-navbar w-full flex-center cursor-default bg-navbar pt-2"
      onMouseDown={onDrag}
    >
      <div className="h-full w-sidebar" onMouseDown={onDrag}></div>
      <Navbar />
    </div>
  )
}
