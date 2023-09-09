import { Icon } from '@iconify/react'

function MusicExtra() {
  return (
    <div className="w-1px flex flex-1 items-center justify-end pr-2">
      <span className="icon text-text m-0 mr-6 text-2xl">
        <Icon icon="simple-icons:audiomack" />
      </span>
      <span className="icon text-text m-0 mr-4 text-2xl">
        <Icon icon="ic:outline-lyrics" />
      </span>
      <span className="icon text-text m-0 mr-4 text-2xl">
        <Icon icon="solar:volume-outline" />
      </span>
    </div>
  )
}

export default MusicExtra
