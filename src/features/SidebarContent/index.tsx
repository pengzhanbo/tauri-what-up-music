import Menu from './Menu'
import MyMusic from './MyMusic'
import MySongList from './MySongList'
import SongListCollect from './SongListCollect'

function SidebarContent() {
  return (
    <div className="h-1px flex-1 flex-shrink-0">
      <div className="h-full overflow-y-auto pb-2">
        <Menu />
        <MyMusic />
        <MySongList />
        <SongListCollect />
      </div>
    </div>
  )
}

export default SidebarContent
