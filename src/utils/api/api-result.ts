import ApiError from './api-error'

type ApiResult<T> = T | ApiError

// Type Guards..
export function isError(result: ApiResult<any>): result is ApiError {
  return (result as ApiError).errorType !== undefined
}

export default ApiResult
