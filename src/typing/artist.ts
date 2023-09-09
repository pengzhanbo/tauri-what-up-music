export interface Artist {
  id: number
  name: string
  alias?: string[]
  picUrl: string
  followed: boolean
  fansCount: number
  musicSize: number
  albumSize: number
  accountId?: number
  briefDesc: string
  img1v1Url: string
  topicPerson: number
  trans: string
}
