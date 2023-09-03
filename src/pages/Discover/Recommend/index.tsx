/**
 * 发现音乐 / 个性推荐
 */
import Banner from './Banner'
import NewMV from './NewMV'
import NewSong from './NewSong'
import Podcast from './Podcast'
import PrivateContent from './PrivateContent'
import SongList from './SongList'

function Recommend() {
  return (
    <div className="px-8 py-6">
      <Banner />
      <SongList />
      <PrivateContent />
      <NewSong />
      <NewMV />
      <Podcast />
    </div>
  )
}

export default Recommend
