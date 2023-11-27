import type { GetAllTopListResponseItem } from '~/apis'
import { IconPlayOutline } from '~/components/Icons'
import LazyImage from '~/components/LazyImage'
import PlayerPlayFill from '~/components/PlayerPlayFill'
import Rectangle from '~/components/Rectangle'
import { usePageNavigate } from '~/hooks'

export interface GlobalListProps {
  list: (GetAllTopListResponseItem & { playCountString: string })[]
}

export default function GlobalList({ list }: GlobalListProps) {
  const { goPlayListDetail } = usePageNavigate()
  return (
    <div>
      <p className="pb-4 text-16px text-text-darker">全球榜</p>
      <div className="grid grid-cols-4 gap-5 pb-6">
        {list.map(item => (
          <section
            key={item.id}
            className="pb-6"
            onClick={() => goPlayListDetail(item.id)}
          >
            <Rectangle className="group cursor-pointer overflow-hidden rounded-md">
              <LazyImage src={item.coverImgUrl} className="h-full w-full" />
              <p className="absolute right-0 top-1 flex-center pr-2 text-sm text-white text-shadow-md">
                <IconPlayOutline className="mr-1" />
                <span>{item.playCountString}</span>
              </p>
              <PlayerPlayFill />
            </Rectangle>
            <p className="line-clamp-2 mt-1 text-13px leading-relaxed text-text-dark">
              <span className="cursor-pointer">{item.name}</span>
            </p>
          </section>
        ))}
      </div>
    </div>
  )
}
