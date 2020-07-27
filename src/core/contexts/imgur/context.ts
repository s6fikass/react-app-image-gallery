import { createContext } from 'react'
import IImgurResponse from '../../services/imgur/models/imgur-response'

type State = {
  data?: IImgurResponse
  loading: boolean
  error: boolean
  page: number
  section: 'hot' | 'top' | 'user'
  sort: 'viral' | 'top' | 'time' | 'rising'
  window: 'day' | 'week' | 'month' | 'year' | 'all'
  showViral: boolean
  actions: {
    getData: () => void
    setPage: (page: number) => void
    setSection: (section: 'hot' | 'top' | 'user') => void
    setSort: (sort: 'viral' | 'top' | 'time' | 'rising') => void
    setWindow: (window: 'day' | 'week' | 'month' | 'year' | 'all') => void
    setShowViral: (showViral: boolean) => void
  }
}

const initialState: State = {
  loading: false,
  error: false,
  page: 0,
  section: 'hot',
  sort: 'viral',
  window: 'day',
  showViral: true,
  actions: {
    getData: () => null,
    setPage: () => null,
    setSection: () => null,
    setSort: () => null,
    setWindow: () => null,
    setShowViral: () => null,
  },
}

const ImgurContext = createContext(initialState)

export default ImgurContext
