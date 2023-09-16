import cn from 'classnames'
import {
  IconCollect,
  IconDownload,
  IconHeart,
  IconShare,
} from '~/components/Icons'

export default function MusicCtrl() {
  const itemStyle = cn(
    'icon w-12 h-12 mx-6 flex-center rounded-full bg-black/3',
    'text-2xl text-text-light-dark hover:bg-black/6 transition',
  )
  return (
    <div className="flex-center pt-6 -mx-6">
      <IconHeart className={itemStyle} />
      <IconCollect className={itemStyle} />
      <IconDownload className={itemStyle} />
      <IconShare className={itemStyle} />
    </div>
  )
}
