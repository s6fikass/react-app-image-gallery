import { createContext } from 'react'
import ILoginRequest from '../../services/auth/models/login-request'

type State = {
  loading: boolean
  actions: {
    login: (data: ILoginRequest) => void
    logout: () => void
  }
}

const initialState: State = {
  loading: false,
  actions: {
    login: () => null,
    logout: () => null,
  },
}

const AuthContext = createContext(initialState)

export default AuthContext
