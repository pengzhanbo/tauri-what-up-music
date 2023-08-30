import Layout from './layouts/Layout'
import Router from '~/routes'

function App() {
  return (
    <div className="App relative h-full">
      <Layout>
        <Router />
      </Layout>
    </div>
  )
}

export default App
