import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'
import RequestConfig from './request-config'
import ApiError from './api-error'
import ApiErrorType from './api-error-type'
import ApiResult from './api-result'
import eventManager, { EVENT_UNAUTHORIZED } from '../event-manager'

export default class ApiProvider {
  private api: AxiosInstance

  public constructor(config: RequestConfig) {
    this.api = axios.create(config)
    this.api.interceptors.request.use((param: AxiosRequestConfig) => ({
      ...param,
      headers: {
        ...param.headers,
        Authorization: 'Client-ID c70f4d5bb26c7de',
      },
    }))
  }

  public async request<T>(config: RequestConfig): Promise<ApiResult<T>> {
    let result: T | ApiError = {
      errorType: ApiErrorType.UNKNOWN,
    }

    try {
      const response = await this.api.request<T>(config)
      const { data } = response
      result = data
    } catch (error) {
      result = this.handleError<T>(error)
    } finally {
      return result
    }
  }

  private handleError<T>(error: AxiosError<T>): ApiError {
    if (error.response) {
      // The request was made and the server responded with an error status code.
      let type: ApiErrorType
      let message: string
      switch (error.response.status) {
        case 400:
          type = ApiErrorType.BAD_REQUEST
          message = `${error.response.data}`
          break
        case 401:
          type = ApiErrorType.UNAUTHORIZED
          message = `${error.response.data}`
          eventManager.emit(EVENT_UNAUTHORIZED)
          break
        case 403:
          type = ApiErrorType.FORBIDDEN
          message = `${error.response.data}`
          break
        case 404:
          type = ApiErrorType.NOT_FOUND
          message = `${error.response.data}`
          break
        case 409:
          type = ApiErrorType.CONFLICT
          message = `${error.response.data}`
          break
        case 500:
          type = ApiErrorType.INTERNAL_SERVER_ERROR
          message = `${error.response.data}`
          break
        default:
          type = ApiErrorType.UNKNOWN
          message = `${error.response.data}`
          break
      }
      return { errorType: type, message }
    } else if (error.request) {
      // The request was made but no response was received.
      return { errorType: ApiErrorType.CONNECTION }
    } else {
      return { errorType: ApiErrorType.UNKNOWN }
    }
  }
}
