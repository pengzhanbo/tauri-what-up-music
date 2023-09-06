/**
 * 发现音乐 / 排行榜
 */
import GlobalList from './GlobalList'
import { useRankTopList } from './hooks'
import OfficialList from './OfficialList'

export default function Rank() {
  const { isLoading, officialList, globalList } = useRankTopList()
  if (isLoading) return <div className="px-8 py-6 text-center">加载中...</div>

  return (
    <div className="px-8 py-6">
      <OfficialList list={officialList} />
      <GlobalList list={globalList} />
    </div>
  )
}
