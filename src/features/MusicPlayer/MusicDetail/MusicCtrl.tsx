import { Icon } from '@iconify/react'
import cn from 'classnames'

export default function MusicCtrl() {
  const itemStyle = cn(
    'icon w-12 h-12 mx-6 flex-center rounded-full bg-black/3',
    'text-2xl text-text-light-dark hover:bg-black/6 transition',
  )
  return (
    <div className="flex-center pt-6 -mx-6">
      <span className={itemStyle}>
        <Icon icon="ph:heart" />
      </span>
      <span className={itemStyle}>
        <Icon icon="solar:add-folder-linear" />
      </span>
      <span className={itemStyle}>
        <Icon icon="bi:download" />
      </span>
      <span className={itemStyle}>
        <Icon icon="ph:share" />
      </span>
    </div>
  )
}
