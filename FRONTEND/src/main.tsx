import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import './i18n.ts'
import { I18nProvider } from './i18n-context'
import { Provider } from 'react-redux'
import store from './store/index.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nProvider>
  </StrictMode>,
)
