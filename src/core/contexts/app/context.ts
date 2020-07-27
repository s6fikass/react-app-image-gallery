import { createContext } from 'react'
import IAdminProfileResponse from '../../services/auth/models/admin-profile-response'

type State = {
  direction: 'rtl' | 'ltr'
  admin?: IAdminProfileResponse
  isAuthenticated: boolean
  setAdmin: (admin: IAdminProfileResponse | undefined) => void
}

const initialState: State = {
  direction: 'ltr',
  isAuthenticated: false,
  setAdmin: () => null,
}

const AppContext = createContext(initialState)

export default AppContext
