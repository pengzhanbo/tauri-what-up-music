/**
 * 发现音乐 / 最新音乐
 */

import { useDeferredValue, useState } from 'react'
import NavHead from './NavHead'
import NewAlbum from './NewAlbum'
import NewSongs from './NewSongs'

export default function LatestMusic() {
  const [navType, setNavType] = useState<1 | 2>(1)
  const defferType = useDeferredValue(navType)
  return (
    <div className="h-full w-full transform-gpu overflow-y-auto scroll-smooth px-8 py-6 will-change-scroll">
      <NavHead nav={navType} onClick={setNavType} />
      {defferType === 1 && <NewSongs />}
      {defferType === 2 && <NewAlbum />}
    </div>
  )
}
