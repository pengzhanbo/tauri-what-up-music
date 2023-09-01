import Navbar from '~/features/Navbar'
import { useWindowDrag } from '~/hooks'

export default function Header() {
  const onDrag = useWindowDrag()
  return (
    <div className="h-navbar bg-navbar flex-center fixed z-10 w-full cursor-default pt-2">
      <div className="w-sidebar h-full" onMouseDown={onDrag}></div>
      <Navbar />
    </div>
  )
}
