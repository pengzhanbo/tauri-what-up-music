import cn from 'classnames'

export default function NavHead({
  nav,
  onClick,
}: {
  nav: 1 | 2
  onClick: (nav: 1 | 2) => void
}) {
  const itemStyle =
    'h-30px rounded-15px px-8 leading-30px -mt-1px cursor-pointer transition'
  const activeStyle = 'bg-[rgb(187,187,187)] text-white'
  return (
    <div className="mb-4 flex-center">
      <div className="m-auto flex-center border rounded-15px px-1px text-13px">
        <p
          className={cn(
            itemStyle,
            '-ml-1px',
            nav === 1 ? activeStyle : 'bg-transparent hover:bg-gray-100',
          )}
          onClick={() => onClick(1)}
        >
          新歌速递
        </p>
        <p
          className={cn(
            itemStyle,
            '-mr-1px',
            nav === 2 ? activeStyle : 'bg-transparent hover:bg-gray-100',
          )}
          onClick={() => onClick(2)}
        >
          新碟上架
        </p>
      </div>
    </div>
  )
}
