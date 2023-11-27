export interface ArtistTypeOptionItem {
  label: string
  value: string
}

// 歌手 类型
export const artistTypeOptions: ArtistTypeOptionItem[] = [
  { label: '全部', value: '-1' },
  { label: '男歌手', value: '1' },
  { label: '女歌手', value: '2' },
  { label: '乐队组合', value: '3' },
]

// 歌手地区
export const artistAreaOptions: ArtistTypeOptionItem[] = [
  { label: '全部', value: '-1' },
  { label: '华语', value: '7' },
  { label: '欧美', value: '96' },
  { label: '日本', value: '8' },
  { label: '韩国', value: '16' },
  { label: '其它', value: '0' },
]

// 歌手筛选
export const artistConditionOptions: ArtistTypeOptionItem[] = [
  { label: '热门', value: '-1' },
  ...'abcdefghijklmnopqrstuvwxyz'
    .split('')
    .map(letter => ({ label: letter.toUpperCase(), value: letter })),
  { label: '#', value: '0' },
]
