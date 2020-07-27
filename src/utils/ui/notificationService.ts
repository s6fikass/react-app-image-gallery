import { notification } from 'antd'
import ApiResult, { isError } from '../api/api-result'
import ApiErrorType from '../api/api-error-type'

export const showErrorNotification = (error: ApiResult<any>, t: any) => {
  if (!isError(error)) return

  let message = ''
  if (error.errorType === ApiErrorType.CUSTOM) {
    message = error.message || t('unexpectedErrorOccurred').toString()
  } else {
    message = t('unexpectedErrorOccurred').toString()
  }
  notification['error']({
    message,
  })
}
