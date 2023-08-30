import { Route, Routes } from 'react-router-dom'
import Discover from '~/pages/Discover'

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Discover />} />
    </Routes>
  )
}

export default Router
