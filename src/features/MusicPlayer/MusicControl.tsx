import { Icon } from '@iconify/react'

function MusicControl() {
  return (
    <div className="flex-center">
      <span className="icon text-text mr-7 cursor-pointer text-2xl">
        <Icon icon="ph:heart" />
      </span>
      <span className="icon text-brand-light mr-7 cursor-pointer text-3xl">
        <Icon icon="basil:skip-prev-solid" />
      </span>
      <span className="icon bg-brand flex-center mr-7 h-11 w-11 cursor-pointer rounded-full text-xl text-white">
        <Icon icon="ph:play-fill" />
        {/* <Icon icon="ph:pause-fill" /> */}
      </span>
      <span className="icon text-brand mr-7 cursor-pointer text-3xl">
        <Icon icon="basil:skip-next-solid" />
      </span>
      <span className="icon text-text cursor-pointer text-xl">
        <Icon icon="uiw:delete" />
      </span>
    </div>
  )
}

export default MusicControl
