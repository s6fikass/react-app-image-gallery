/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer, useEffect } from 'react'
import { reducer, initialState } from './reducers/reducer'
import ImgurContext from './context'
import imgurService from '../../services/imgur'
import { isError } from '../../../utils/api/api-result'

const ImgurProvider: React.FC = (props) => {
  const [
    { data, loading, error, page, section, sort, window, showViral },
    dispatch,
  ] = useReducer(reducer, initialState)

  useEffect(() => {
    getData()
  }, [page])

  useEffect(() => {
    if (page === 0) {
      getData()
    } else {
      setPage(0)
    }
  }, [section, sort, window, showViral])

  const getData = async () => {
    dispatch({ type: 'loading' })

    const result = await imgurService.getImages(
      section,
      sort,
      page,
      window,
      showViral
    )

    if (isError(result)) {
      dispatch({ type: 'error' })
      return
    }

    dispatch({ type: 'success', payload: { data: result } })
  }

  const setPage = (page: number) =>
    dispatch({ type: 'changePage', payload: { page } })

  const setSection = (section: 'hot' | 'top' | 'user') =>
    dispatch({ type: 'changeSection', payload: { section } })

  const setSort = (sort: 'viral' | 'top' | 'time' | 'rising') =>
    dispatch({ type: 'changeSort', payload: { sort } })

  const setWindow = (window: 'day' | 'week' | 'month' | 'year' | 'all') =>
    dispatch({ type: 'changeWindow', payload: { window } })

  const setShowViral = (showViral: boolean) =>
    dispatch({ type: 'changeShowViral', payload: { showViral } })

  return (
    <ImgurContext.Provider
      value={{
        data,
        loading,
        error,
        page,
        section,
        sort,
        window,
        showViral,
        actions: {
          getData,
          setPage,
          setSection,
          setSort,
          setWindow,
          setShowViral,
        },
      }}
    >
      {props.children}
    </ImgurContext.Provider>
  )
}

export default ImgurProvider
