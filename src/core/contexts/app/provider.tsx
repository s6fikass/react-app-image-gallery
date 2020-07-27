import React, { useReducer, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ConfigProvider, Empty } from 'antd'
import en from 'antd/es/locale/en_US'
import ar from 'antd/es/locale/ar_EG'
import IAdminProfileResponse from '../../services/auth/models/admin-profile-response'
import AppContext from './context'
import { reducer, initialState } from './reducers/reducer'
import { KEY_USER } from '../../constants'

const AppProvider: React.FC = (props) => {
  const [{ direction, locale, admin }, dispatch] = useReducer(
    reducer,
    initialState
  )

  const {
    i18n: { language },
  } = useTranslation()

  useEffect(() => {
    dispatch({
      type: 'setDirection',
      payload: { direction: language === 'ar' ? 'rtl' : 'ltr' },
    })
    dispatch({
      type: 'setLocale',
      payload: { locale: language === 'ar' ? ar : en },
    })
  }, [language])

  useEffect(() => {
    const adminJson = localStorage.getItem(KEY_USER)
    if (adminJson) {
      const adminObj: IAdminProfileResponse = JSON.parse(adminJson)
      setAdmin(adminObj)
    }
  }, [])

  const setAdmin = (admin: IAdminProfileResponse | undefined) => {
    dispatch({ type: 'setAdmin', payload: { admin } })
  }

  return (
    <ConfigProvider
      locale={locale}
      direction={direction}
      renderEmpty={() => <Empty />}
    >
      <AppContext.Provider
        value={{
          direction,
          admin,
          isAuthenticated: admin ? true : false,
          setAdmin,
        }}
      >
        {props.children}
      </AppContext.Provider>
    </ConfigProvider>
  )
}

export default AppProvider
