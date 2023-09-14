import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PlaylistInfo from './Infomation'
import NavHead from './NavHead'
import SongList from './SongList'
import Loading from '~/components/Loading'
import { usePlayListDetail, useScrollBottom } from '~/hooks'

const limit = 100
export default function PlaylistDetail() {
  const [search] = useSearchParams()
  const id = search.get('id')!
  const [type, setType] = useState(0)
  const ref = useRef(null)
  const { playlist, songs, isLoading } = usePlayListDetail(parseInt(id))
  const [offset, setOffset] = useState(1)
  const total = Math.ceil(songs.length / limit)
  useScrollBottom(ref, () => {
    setOffset((offset) => (offset > total ? total : offset + 1))
  })

  const list = songs.slice(0, offset * limit)

  if (isLoading) return <Loading className="h-170px" />

  if (!playlist) return null

  return (
    <div className="scroll-container py-4" ref={ref}>
      <PlaylistInfo playlist={playlist} />
      <NavHead
        current={type}
        onChange={setType}
        commentCount={playlist.commentCount}
      />
      <SongList songs={list} show={type === 0} />
    </div>
  )
}
