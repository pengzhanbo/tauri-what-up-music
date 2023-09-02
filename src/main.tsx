import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import '~/styles'
import { SWRConfig } from 'swr'
import App from '~/App'
import { store } from '~/store'
import { localStorageProvider } from '~/utils'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SWRConfig
          value={{
            provider: localStorageProvider,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 5000 * 60,
          }}
        >
          <App />
        </SWRConfig>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
