import React, { useReducer, useContext } from 'react'
import JwtDecode from 'jwt-decode'
import { useTranslation } from 'react-i18next'
import { isError } from '../../../utils/api/api-result'
import { KEY_TOKEN, KEY_USER } from '../../constants'
import ILoginRequest from './../../services/auth/models/login-request'
import IAdminProfileResponse from '../../services/auth/models/admin-profile-response'
import authService from '../../services/auth'
import { showErrorNotification } from '../../../utils/ui/notificationService'
import AppContext from '../app/context'
import AuthContext from './context'
import { reducer, initialState } from './reducers/reducer'

const AuthProvider: React.FC = (props) => {
  const { t } = useTranslation()
  const { setAdmin } = useContext(AppContext)

  const [{ loading }, dispatch] = useReducer(reducer, initialState)

  const login = async (data: ILoginRequest) => {
    dispatch({ type: 'setLoading', payload: { loading: true } })
    const result = await authService.login(data)
    dispatch({ type: 'setLoading', payload: { loading: false } })

    if (isError(result)) {
      showErrorNotification(result, t)
      return
    }

    localStorage.setItem(KEY_TOKEN, result)
    const decoded: { profile: IAdminProfileResponse } = JwtDecode(result)
    const admin = decoded.profile
    localStorage.setItem(KEY_USER, JSON.stringify(admin))
    setAdmin(admin)
  }

  const logout = async () => {}

  return (
    <AuthContext.Provider value={{ loading, actions: { login, logout } }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
