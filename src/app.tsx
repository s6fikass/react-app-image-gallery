import React from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from './utils/localization/i18n'
import AppRouter from './views/layouts/app-router'
import AppProvider from './core/contexts/app/provider'
import AuthProvider from './core/contexts/auth/provider'
import ImgurProvider from './core/contexts/imgur/provider'

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <AppProvider>
        <AuthProvider>
          <ImgurProvider>
            <AppRouter />
          </ImgurProvider>
        </AuthProvider>
      </AppProvider>
    </I18nextProvider>
  )
}

export default App
