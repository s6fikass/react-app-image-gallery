import ApiService from '../../../utils/api/api-service'
import ApiResult from '../../../utils/api/api-result'
import IImgurResponse from './models/imgur-response'

class ImgurService extends ApiService {
  constructor() {
    super({ baseURL: 'https://api.imgur.com/3/gallery' })
  }

  public getImages(
    section: string,
    sort: string,
    page: number,
    window: string,
    showViral: boolean
  ): Promise<ApiResult<IImgurResponse>> {
    return this.get(`/${section}/${sort}/${page}.json?showViral=${showViral}`)
  }
}

const imgurService = new ImgurService()

export default imgurService
