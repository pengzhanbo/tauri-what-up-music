import { IconAudioMack, IconLyric, IconVolume } from '~/components/Icons'

function MusicExtra() {
  return (
    <div className="w-1px flex flex-1 items-center justify-end pr-2">
      <IconAudioMack className="m-0 mr-6 text-2xl text-text" />
      <IconLyric className="m-0 mr-4 text-2xl text-text" />
      <IconVolume className="m-0 mr-4 text-2xl text-text" />
    </div>
  )
}

export default MusicExtra
