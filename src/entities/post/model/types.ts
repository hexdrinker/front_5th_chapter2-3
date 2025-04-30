import { IUser } from "@/entities/user/model/types"

interface IPostListResponse {
  posts: IPost[]
  total: number
  skip: number
  limit: number
}

interface IPost {
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

interface IPostWithAuthor extends IPost {
  author?: IUser
}

interface IPostInsertRequest {
  title: string
  body: string
  userId: number
}

type IPostUpdateRequest = IPost

interface IPostSearchParams {
  limit: number
  skip: number
  searchQuery: string
  sortBy: string
  sortOrder: string
}

export type { IPost, IPostWithAuthor, IPostListResponse, IPostInsertRequest, IPostUpdateRequest, IPostSearchParams }
