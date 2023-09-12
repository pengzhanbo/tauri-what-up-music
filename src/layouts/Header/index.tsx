import Navbar from '~/features/Navbar'
import NavbarLeft from '~/features/Navbar/NavbarLeft'
import { useWindowDrag } from '~/hooks'

export default function Header() {
  const onDrag = useWindowDrag()
  return (
    <div
      className="fixed z-10 h-navbar w-full flex-center cursor-default bg-navbar pt-2"
      onMouseDown={onDrag}
    >
      <NavbarLeft />
      <Navbar />
    </div>
  )
}
