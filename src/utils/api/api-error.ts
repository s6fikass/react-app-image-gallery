import ApiErrorType from './api-error-type'

export default interface ApiError {
  errorType: ApiErrorType
  message?: string
}
