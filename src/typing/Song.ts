import type { Album } from './album'
import type { Artist } from './artist'

export interface Song {
  id: number
  name: string
  /**
   * 0: 一般类型
   *
   * 1: 通过云盘上传的音乐，网易云不存在公开对应
   * 如果没有权限将不可用，除了歌曲长度以外大部分信息都为null。
   * 可以通过 `/api/v1/playlist/manipulate/tracks` 接口添加到播放列表。
   * 如果添加到“我喜欢的音乐”，则仅自己可见，除了长度以外各种信息均为未知，且无法播放。
   * 如果添加到一般播放列表，虽然返回code 200，但是并没有效果。
   * 网页端打开会看到404画面。
   * 属于这种歌曲的例子: https://music.163.com/song/1345937107
   *
   * 2: 通过云盘上传的音乐，网易云存在公开对应
   * 如果没有权限则只能看到信息，但无法直接获取到文件。
   * 可以通过 `/api/v1/playlist/manipulate/tracks` 接口添加到播放列表。
   * 如果添加到“我喜欢的音乐”，则仅自己可见，且无法播放。
   * 如果添加到一般播放列表，则自己会看到显示“云盘文件”，
   * 且云盘会多出其对应的网易云公开歌曲。其他人看到的是其对应的网易云公开歌曲。
   * 网页端打开会看到404画面。
   * 属于这种歌曲的例子: https://music.163.com/song/435005015
   */
  t: 0 | 1 | 2
  /**
   * 歌手列表
   */
  ar: Pick<Artist, 'id' | 'name' | 'alias'>[]
  /**
   * 别名，第一个用于副标题
   */
  alias: string[]

  /**
   * 专辑
   */
  al: Pick<Album, 'id' | 'name' | 'picUrl'>

  /**
   * 歌曲时长
   */
  dt: number
  /**
   * 歌曲热度
   */
  pop: number

  /**
   * 0: 免费或无版权
   *
   * 1: VIP 歌曲
   *
   * 4: 购买专辑
   *
   * 8: 非会员可免费播放低音质，会员可播放高音质及下载
   *
   * fee 为 1 或 8 的歌曲均可单独购买 2 元单曲
   */
  fee: 0 | 1 | 4 | 8

  /**
   * Hi-Res 无损文件
   */
  hr: null | SongQuality

  /**
   * SQ 无损文件
   */
  sq: null | SongQuality

  /**
   * 高质量
   */
  h: null | SongQuality

  /**
   * 中质量
   */
  m: null | SongQuality

  /**
   * 低质量
   */
  l: null | SongQuality

  /**
   * None或如"04", "1/2", "3", "null"的字符串，表示歌曲属于专辑中第几张CD，对应音频文件的Tag
   */
  cd: null | string

  /**
   * 表示歌曲属于CD中第几曲，0表示没有这个字段，对应音频文件的Tag
   */
  no: number

  /**
   * 非零表示有MV ID
   */
  mv: number

  /**
   * 0: 不是DJ节目
   * 其他：是DJ节目，表示DJ ID
   */
  djId: number

  /**
   * 对于t == 2的歌曲，表示匹配到的公开版本歌曲ID
   */
  s_id: number

  /**
   * 0: 未知  1: 原曲  2: 翻唱
   */
  originCoverType: 0 | 1 | 2
  /**
   * 版权信息
   */
  v: number
  version: number

  crbt: null | string

  cf: null | string

  publishTime: number
}

/**
 * 歌曲文件信息
 */
export interface SongQuality {
  /**
   * 码率
   */
  br: number
  fid: number
  size: number
  sr: number
  vd: number
}

export interface SongPlayUrl {
  id: number
  br: number
  url: string
  size: number
  /**
   * 音质
   *
   * standard 标准
   *
   * higher  较高
   *
   * exhigh  极高
   *
   * lossless 无损
   *
   * hires Hi-Res
   *
   * jyeffect  高清环绕声
   *
   * sky  沉浸环绕声
   *
   * jymaster 超清母带
   */
  level:
    | 'standard'
    | 'higher'
    | 'exhigh'
    | 'lossless'
    | 'hires'
    | 'jyeffect'
    | 'sky'
    | 'jymaster'
  md5: string
}
