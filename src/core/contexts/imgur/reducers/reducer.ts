import IImgurResponse from '../../../services/imgur/models/imgur-response'

type State = {
  data?: IImgurResponse
  loading: boolean
  error: boolean
  page: number
  section: 'hot' | 'top' | 'user' // hot is default
  sort: 'viral' | 'top' | 'time' | 'rising' // rising only with user section / viral is default
  window: 'day' | 'week' | 'month' | 'year' | 'all' // day is default / section top only
  showViral: boolean // true is default / user section only
}

type Action =
  | { type: 'loading' }
  | { type: 'success'; payload: { data: IImgurResponse } }
  | { type: 'error' }
  | { type: 'changePage'; payload: { page: number } }
  | { type: 'changeSection'; payload: { section: 'hot' | 'top' | 'user' } }
  | {
      type: 'changeSort'
      payload: { sort: 'viral' | 'top' | 'time' | 'rising' }
    }
  | {
      type: 'changeWindow'
      payload: { window: 'day' | 'week' | 'month' | 'year' | 'all' }
    }
  | {
      type: 'changeShowViral'
      payload: { showViral: boolean }
    }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'loading':
      return { ...state, loading: true, error: false }
    case 'success':
      return { ...state, loading: false, data: action.payload.data }
    case 'error':
      return { ...state, loading: false, error: true }
    case 'changePage':
      return { ...state, page: action.payload.page }
    case 'changeSection': {
      if (state.section === 'user' && action.payload.section !== 'user') {
        if (state.sort === 'rising') {
          return { ...state, section: action.payload.section, sort: 'viral' }
        }
      }
      return { ...state, section: action.payload.section }
    }
    case 'changeSort':
      return { ...state, sort: action.payload.sort }
    case 'changeWindow':
      return { ...state, window: action.payload.window }
    case 'changeShowViral':
      return { ...state, showViral: action.payload.showViral }
    default:
      return state
  }
}

export const initialState: State = {
  loading: false,
  error: false,
  page: 0,
  section: 'hot',
  sort: 'viral',
  window: 'day',
  showViral: true,
}
