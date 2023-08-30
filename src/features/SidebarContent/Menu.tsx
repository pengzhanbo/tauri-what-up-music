import SidebarItem from '~/components/SidebarItem'
import SidebarList from '~/components/SidebarList'

function Menu() {
  return (
    <SidebarList>
      <SidebarItem text="发现音乐" icon="tabler:music" active />
      <SidebarItem text="播客" icon="ph:broadcast" />
      <SidebarItem text="私人漫游" icon="ph:radio" />
      <SidebarItem text="视频" icon="octicon:video-24" />
      <SidebarItem text="关注" icon="octicon:people-24" />
    </SidebarList>
  )
}

export default Menu
