import { useNavigate } from 'react-router-dom'

export const usePageNavigate = () => {
  const navigate = useNavigate()

  const goPlayListDetail = (id: number) => navigate(`/playlist/detail?id=${id}`)

  return {
    goPlayListDetail,
  }
}
