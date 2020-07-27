export default interface IImgurResponse {
  data: {
    images: Array<{
      id: string
      title: string
      description: string
      ups: number
      downs: number
      link: string
      datetime: number
      comment_count: number
      points: number
      score: number
      size: number
      views: number
    }>
  }[]
}
