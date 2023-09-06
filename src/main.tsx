import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import '~/styles'
import { SWRConfig } from 'swr'
import App from '~/App'
import { swrConfig } from '~/configs'
import { store } from '~/store'

async function render() {
  const root = createRoot(document.getElementById('root') as HTMLElement)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <SWRConfig value={swrConfig}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SWRConfig>
      </Provider>
    </React.StrictMode>,
  )
}

async function bootstrap() {
  render()
}

bootstrap()
