import SidebarContent from '~/features/SidebarContent'
import UserInfo from '~/features/UserInfo/UserInfo'

export default function Sidebar() {
  return (
    <div className="pt-navbar w-sidebar bg-sidebar h-full flex flex-col">
      <UserInfo />
      <SidebarContent />
    </div>
  )
}
