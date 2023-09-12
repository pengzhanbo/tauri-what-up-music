import { Icon } from '@iconify/react'
import { usePlayList } from './hooks'
import LazyImage from '~/components/LazyImage'
import Loading from '~/components/Loading'
import Pagination from '~/components/Pagination'
import Rectangle from '~/components/Rectangle'

export default function PlayList({ cat }: { cat: string | number }) {
  const { isLoading, page, totalPage, playlist, setPage } = usePlayList(cat)

  if (isLoading) return <Loading className="h-170px" />

  return (
    <div className="pt-6">
      <div className="grid grid-cols-4 gap-5">
        {playlist.map((item) => (
          <section key={item.id} className="mb-6">
            <Rectangle className="group cursor-pointer overflow-hidden rounded-md">
              <LazyImage
                src={item.coverImgUrl}
                alt={item.name}
                className="h-full w-full"
              />
              <p className="absolute right-0 top-1 flex-center pr-2 text-sm text-white text-shadow-md">
                <span className="relative top-2px mr-1 icon">
                  <Icon icon="iconamoon:player-play" />
                </span>
                <span>{item.playCount}</span>
              </p>
              <div className="absolute bottom-2 left-2 w-70% flex items-center pr-2 text-sm text-white text-shadow-md">
                <span className="relative top-1px mr-1 icon">
                  <Icon icon="ph:user" />
                </span>
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
              <span className="absolute bottom-2 right-2 icon h-12 w-12 flex-center rounded-full bg-white/60 text-2xl text-brand opacity-0 transition group-hover:opacity-100">
                <Icon icon="iconamoon:player-play-fill" />
              </span>
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
