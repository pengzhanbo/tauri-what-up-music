import SidebarItem from '~/components/SidebarItem'
import SidebarList from '~/components/SidebarList'

function MyMusic() {
  return (
    <SidebarList title="我的音乐">
      <SidebarItem text="我喜欢的音乐" icon="ph:heart" />
      <SidebarItem text="下载管理" icon="bi:download" />
      <SidebarItem text="最近播放" icon="mdi:clock-outline" />
      <SidebarItem text="我的音乐云盘" icon="ph:cloud" />
      <SidebarItem text="我的播客" icon="tabler:broadcast" />
      <SidebarItem text="我的收藏" icon="ph:star" />
    </SidebarList>
  )
}

export default MyMusic
