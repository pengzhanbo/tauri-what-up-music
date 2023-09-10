import Navbar from '~/features/Navbar'
import { useWindowDrag } from '~/hooks'

export default function Header() {
  const onDrag = useWindowDrag()
  return (
    <div
      className="fixed z-10 h-navbar w-full flex-center cursor-default bg-navbar pt-2"
      onMouseDown={onDrag}
    >
      {/* <div className="absolute left-0 top-0 z-1 h-full w-full bg-white/85 backdrop-blur-2xl"></div> */}
      <div className="relative z-2 h-full w-sidebar" onMouseDown={onDrag}></div>
      <Navbar />
    </div>
  )
}
