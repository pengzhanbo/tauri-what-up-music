import SidebarContent from '~/features/SidebarContent'
import UserInfo from '~/features/UserInfo/UserInfo'

export default function Sidebar() {
  return (
    <div className="h-full w-sidebar flex flex-col pt-navbar bg-sidebar">
      <UserInfo />
      <SidebarContent />
    </div>
  )
}
