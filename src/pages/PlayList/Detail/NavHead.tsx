import cn from 'classnames'
import { numUnit } from '~/utils'

export default function NavHead({
  commentCount,
  current,
  onChange,
}: NavHeadProps) {
  const navList = [
    { name: '歌曲列表', value: 0 },
    {
      name: (
        <>
          评论
          <span className={current === 1 ? 'text-brand' : 'text-text-light'}>
            ({numUnit(commentCount)})
          </span>
        </>
      ),
      value: 1,
    },
    { name: '收藏者', value: 2 },
  ]

  return (
    <div className="mx-8 flex items-center border-b pt-10">
      <div className="flex flex-1 items-center text-text-dark">
        {navList.map((item) => (
          <p
            key={item.value}
            className={cn(
              'mr-8 pb-2 cursor-pointer transition border-b-2 border-b-solid relative top-1px',
              current === item.value
                ? 'text-brand border-b-brand'
                : 'hover:text-text-darker border-b-transparent',
            )}
            onClick={() => onChange(item.value)}
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export interface NavHeadProps {
  commentCount: number
  current: number
  onChange: (current: number) => void
}
