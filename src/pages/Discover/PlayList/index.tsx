/**
 * 发现音乐 / 歌单
 */

import { useState } from 'react'
import CatListNav from './CatListNav'
import HighQuality from './HighQuality'
import type { Cat } from './hooks'
import { useCatList } from './hooks'
import PlayListContent from './PlayListContent'

export default function PlayList() {
  const data = useCatList()
  const { isLoading } = data
  const [currentCat, setCurrentCat] = useState<Cat>(data.defaultCat)

  if (isLoading) return null
  return (
    <div className="px-8 py-6">
      <HighQuality cat={currentCat.value} />
      <CatListNav {...data} currentCat={currentCat} onChange={setCurrentCat} />
      <PlayListContent cat={currentCat.value} />
    </div>
  )
}
