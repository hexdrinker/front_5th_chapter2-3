interface IApiSelectPostListResponse {
  posts: IApiSelectPostItem[]
  total: number
  skip: number
  limit: number
}

interface IApiSelectPostItem {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
  userId: number
}

interface IApiInsertPostRequest {
  title: string
  body: string
  userId: number
}

type IApiUpdatePostRequest = IApiSelectPostItem

interface IApiSelectPostSearchParams {
  limit: number
  skip: number
}

export type {
  IApiSelectPostListResponse,
  IApiSelectPostItem,
  IApiInsertPostRequest,
  IApiUpdatePostRequest,
  IApiSelectPostSearchParams,
}
