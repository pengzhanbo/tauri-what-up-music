import { useEffect, useState } from 'react'
import useSwr from 'swr'
import { getAllCatList, getHotCatList, getPlayList } from '~/apis'
import { numUnit } from '~/utils'

export interface Cat {
  name: string
  value: string | number
  hot?: boolean
}

export interface Category {
  category: number
  name: string
  icon: string
  catList: Cat[]
}

export interface CatList {
  isLoading: boolean
  hotCatList: Cat[]
  allCatList: Category[]
  defaultCat: Cat
}

export const useCatList = (): CatList => {
  const { isLoading, data } = useSwr('discover/playlist/cat-list', async () => {
    const allCatList = await getAllCatList()
    const hotCatList = await getHotCatList()
    return { allCatList, hotCatList }
  })

  const hotCatList: Cat[] = []
  const allCatList: Category[] = [
    { category: 0, name: '语种', icon: 'ic:baseline-language', catList: [] },
    { category: 1, name: '风格', icon: 'ph:piano-keys-light', catList: [] },
    {
      category: 2,
      name: '场景',
      icon: 'icon-park-outline:tea-drink',
      catList: [],
    },
    { category: 3, name: '情感', icon: 'cil:smile', catList: [] },
    { category: 4, name: '主题', icon: 'ion:grid-outline', catList: [] },
  ]
  let defaultCat: Cat = { name: '全部歌单', value: '' }

  if (data?.hotCatList) {
    data.hotCatList.tags.forEach((item) => {
      hotCatList.push({ name: item.name, hot: true, value: item.name })
    })
  }

  if (data?.allCatList) {
    const { all, sub } = data.allCatList
    defaultCat = { name: all.name, value: '' }
    sub.forEach((item) => {
      const catList = allCatList.find((cat) => cat.category === item.category)
      if (catList) {
        catList.catList.push({
          name: item.name,
          hot: item.hot,
          value: item.name,
        })
      }
    })
  }

  return { isLoading, hotCatList, allCatList, defaultCat }
}

export const usePlayList = (cat: string | number) => {
  const [page, setPage] = useState(1)
  const limit = 100
  const { isLoading, data } = useSwr(
    [
      'discover/playlist/get-playlist',
      { cat, limit, offset: (page - 1) * limit },
    ],
    ([, params]) => getPlayList(params),
  )
  const playlist = (data?.playlists || []).map((item) => ({
    id: item.id,
    name: item.name,
    coverImgUrl: `${item.coverImgUrl.split('?')[0]}?param=600y600`,
    playCount: numUnit(item.playCount),
    nickname: item.creator.nickname,
    nickIcon: item.creator.avatarDetail?.identityIconUrl || '',
    description: item.description,
  }))

  const totalPage = Math.ceil((data?.total || 0) / limit)

  useEffect(() => {
    setPage(1)
  }, [cat])

  return { isLoading, page, totalPage, playlist, setPage }
}
