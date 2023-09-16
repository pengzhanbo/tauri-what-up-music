import { usePlayList } from './hooks'
import { IconArtist, IconPlayOutline } from '~/components/Icons'
import LazyImage from '~/components/LazyImage'
import Loading from '~/components/Loading'
import Pagination from '~/components/Pagination'
import PlayerPlayFill from '~/components/PlayerPlayFill'
import Rectangle from '~/components/Rectangle'
import { usePageNavigate } from '~/hooks'

export default function PlayList({ cat }: { cat: string | number }) {
  const { isLoading, page, totalPage, playlist, setPage } = usePlayList(cat)
  const { goPlayListDetail } = usePageNavigate()

  if (isLoading) return <Loading className="h-170px" />

  return (
    <div className="pt-6">
      <div className="grid grid-cols-4 gap-5">
        {playlist.map((item) => (
          <section key={item.id} className="mb-6">
            <Rectangle
              className="group cursor-pointer overflow-hidden border rounded-md"
              onClick={() => goPlayListDetail(item.id)}
            >
              <LazyImage src={item.coverImgUrl} className="h-full w-full" />
              <p className="absolute right-0 top-1 flex-center pr-2 text-sm text-white text-shadow-md">
                <IconPlayOutline className="mr-1" />
                <span>{item.playCount}</span>
              </p>
              <div className="absolute bottom-2 left-2 w-70% flex items-center pr-2 text-sm text-white text-shadow-md">
                <IconArtist className="relative top-1px mr-1" />
                <div className="h-17px w-1px flex-1 overflow-hidden">
                  <p className="relative inline-block pr-16px">
                    <span className="line-clamp-1">{item.nickname}</span>
                    <span
                      className="absolute right-0 top-3px inline-block h-4 w-4 bg-cover"
                      style={{ backgroundImage: `url(${item.nickIcon})` }}
                    ></span>
                  </p>
                </div>
              </div>
              <PlayerPlayFill blur="lighter" position="rb" />
            </Rectangle>
            <p className="line-clamp-2 mt-1 text-13px leading-relaxed text-text-dark">
              <span className="cursor-pointer">{item.name}</span>
            </p>
          </section>
        ))}
      </div>
      <Pagination page={page} total={totalPage} onChange={setPage} />
    </div>
  )
}
