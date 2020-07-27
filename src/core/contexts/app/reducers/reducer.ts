import IAdminProfileResponse from '../../../services/auth/models/admin-profile-response'
import ar from 'antd/es/locale/ar_EG'

type State = {
  direction: 'rtl' | 'ltr'
  locale: any
  admin?: IAdminProfileResponse
}

type Action =
  | { type: 'setDirection'; payload: { direction: 'rtl' | 'ltr' } }
  | { type: 'setLocale'; payload: { locale: any } }
  | { type: 'setAdmin'; payload: { admin: IAdminProfileResponse | undefined } }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setDirection':
      return { ...state, direction: action.payload.direction }
    case 'setLocale':
      return { ...state, locale: action.payload.locale }
    case 'setAdmin':
      return {...state, admin: action.payload.admin}
    default:
      return state
  }
}

export const initialState: State = {
  direction: 'ltr',
  locale: ar
}
