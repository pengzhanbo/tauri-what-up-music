import { Icon } from '@iconify/react'
import type { GetAllTopListResponseItem } from '~/apis'
import LazyImage from '~/components/LazyImage'
import Rectangle from '~/components/Rectangle'
import { numUnit } from '~/utils'

export interface GlobalListProps {
  list: GetAllTopListResponseItem[]
}

export default function GlobalList({ list }: GlobalListProps) {
  return (
    <div>
      <p className="pb-4 text-16px text-text-darker">官方榜</p>
      <div className="grid grid-cols-4 gap-5 pb-6">
        {list.map((item) => (
          <section key={item.id} className="pb-6">
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
                <span>{numUnit(item.playCount)}</span>
              </p>
              <span className="absolute left-50% top-50% z-3 icon h-12 w-12 flex-center cursor-pointer rounded-full bg-white/40 text-2xl text-brand opacity-0 backdrop-blur-9 transition -translate-50% group-hover:opacity-100">
                <Icon icon="iconamoon:player-play-fill" />
              </span>
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
