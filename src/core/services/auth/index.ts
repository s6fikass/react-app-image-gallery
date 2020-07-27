import ApiService from '../../../utils/api/api-service'
import ApiResult from '../../../utils/api/api-result'
import ILoginRequest from './models/login-request'

class AuthService extends ApiService {
  constructor() {
    super({ baseURL: `${process.env.REACT_APP_API_BASE_URL}/auth` })
  }

  public login(request: ILoginRequest): Promise<ApiResult<string>> {
    return this.post('/sign-in', request)
  }
}

const authService = new AuthService()

export default authService
