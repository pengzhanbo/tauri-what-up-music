/**
 * 发现音乐 / 排行榜
 */
import GlobalList from './GlobalList'
import { useRankTopList } from './hooks'
import OfficialList from './OfficialList'
import Loading from '~/components/Loading'

export default function Rank() {
  const { isLoading, officialList, globalList } = useRankTopList()
  if (isLoading) return <Loading className="h-170px" />

  return (
    <div className="px-8 py-6">
      <OfficialList list={officialList} />
      <GlobalList list={globalList} />
    </div>
  )
}
