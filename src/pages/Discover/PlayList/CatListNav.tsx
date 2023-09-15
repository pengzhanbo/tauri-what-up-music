import { Icon } from '@iconify/react'
import cn from 'classnames'
import { memo, useCallback, useState } from 'react'
import type { Cat, CatList } from './hooks'

export interface CatListNavProps extends CatList {
  onChange: (cat: Cat) => void
  currentCat: Cat
}

function SelectCat({ cat, onClick }: { cat: string; onClick?: () => void }) {
  return (
    <div
      className="h-30px w-30 flex-center cursor-pointer border rounded-full bg-transparent transition hover:bg-gray-100"
      onClick={onClick}
    >
      <span className="text-13px leading-13px text-text-dark">{cat}</span>
      <span className="relative icon text-2xl text-text-light -top-2px">
        <Icon icon="eva:arrow-ios-forward-fill" />
      </span>
    </div>
  )
}

const HotCatList = memo(function HotCatList({
  hotCatList,
  currentCat,
  onChange,
}: Pick<CatListNavProps, 'hotCatList' | 'currentCat' | 'onChange'>) {
  return (
    <div className="flex items-center text-sm text-text-light-dark -mr-1">
      {hotCatList.map((item) => (
        <span
          key={item.name}
          className={cn(
            'inline-block px-3 leading-20px h-20px rounded-15px',
            'cursor-pointer transition relative mx-1',
            'before:(content-[""] absolute top-50% -right-1 block w-0 h-12px border-r border-gray-300 -translate-y-50%)',
            'last-of-type:before:border-none',
            item.value === currentCat.value
              ? 'text-brand bg-brand-lighter'
              : 'hover:text-text-dark bg-transparent',
          )}
          onClick={() => onChange(item)}
        >
          {item.name}
        </span>
      ))}
    </div>
  )
})

const AllCateList = memo(function AllCateList({
  allCatList,
  defaultCat,
  currentCat,
  onChange,
  show,
}: Pick<
  CatListNavProps,
  'allCatList' | 'defaultCat' | 'currentCat' | 'onChange'
> & { show: boolean }) {
  const className = cn(
    'shadow-box absolute left-0 top-[calc(100%+10px)] z-1 w-full rounded-md bg-white py-4',
    show ? 'block' : 'hidden',
  )
  return (
    <div className={className}>
      <span className="absolute left-7 z-1 inline-block w-14px border-7px border-b-white border-l-transparent border-r-transparent border-t-transparent border-solid -top-14px"></span>
      <span className="absolute left-7 z-0 inline-block w-14px border-7px border-b-gray-100 border-l-transparent border-r-transparent border-t-transparent border-solid -top-15px"></span>
      <div className="border-b px-4 pb-4">
        <span
          className={cn(
            'inline-block h-32px rounded-16px px-4 leading-32px cursor-pointer transition',
            defaultCat.value === currentCat.value
              ? 'text-brand bg-brand-lighter'
              : 'hover:text-text-dark bg-transparent',
          )}
          onClick={() => onChange(defaultCat)}
        >
          {defaultCat.name}
        </span>
      </div>
      <div className="px-6 pt-4">
        {allCatList.map((category) => (
          <div key={category.name} className="flex items-start pb-6">
            <div className="w-30 flex items-center text-text-lighter">
              <span className="mr-2 icon text-3xl">
                <Icon icon={category.icon} />
              </span>
              <span className="text-13px">{category.name}</span>
            </div>
            <div className="grid grid-cols-6 flex-1">
              {category.catList.map((item) => (
                <div key={item.name} className="mb-2">
                  <p
                    className={cn(
                      'relative inline-block text-13px h-32px rounded-16px px-4 leading-32px cursor-pointer transition',
                      item.value === currentCat.value
                        ? 'text-brand bg-brand-lighter'
                        : 'hover:text-text-dark bg-transparent',
                    )}
                    onClick={() => onChange(item)}
                  >
                    <span>{item.name}</span>
                    {item.hot && (
                      <span className="absolute right-0 text-6px font-800 text-brand -top-3px">
                        HOT
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

export default memo(function CatListNav({
  allCatList,
  defaultCat,
  hotCatList,
  currentCat,
  onChange,
}: CatListNavProps) {
  const [show, setShow] = useState(false)
  const handleClick = useCallback((cat: Cat) => {
    setShow(false)
    onChange(cat)
  }, [])

  return (
    <div className="relative pt-4">
      <div className="item-center flex items-center justify-between">
        <SelectCat
          cat={currentCat.name}
          onClick={() => setShow((show) => !show)}
        />
        <HotCatList
          hotCatList={hotCatList}
          currentCat={currentCat}
          onChange={handleClick}
        />
      </div>
      <AllCateList
        allCatList={allCatList}
        defaultCat={defaultCat}
        currentCat={currentCat}
        show={show}
        onChange={handleClick}
      />
    </div>
  )
})
