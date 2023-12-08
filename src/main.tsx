import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/index.tsx'
import { ThemeProvider } from '@emotion/react'
import { theme } from './layouts/theme.tsx'
import { AppLoader } from './components/AppLoader/index.tsx'
import { Suspense } from 'react'
import { MainEntry } from './MainEntry.tsx'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './i18n/index'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<AppLoader show size={32} />}>
            <MainEntry />
            <Toaster />
          </Suspense>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
