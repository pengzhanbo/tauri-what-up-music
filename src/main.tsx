import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import '~/styles'
import { SWRConfig } from 'swr'
import App from '~/App'
import { swrConfig } from '~/constants'
import { store } from '~/store'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SWRConfig value={swrConfig}>
          <App />
        </SWRConfig>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
