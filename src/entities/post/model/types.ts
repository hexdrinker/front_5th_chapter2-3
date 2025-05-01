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

interface IPostCreateRequest {
  title: string
  body: string
  userId: number
}

interface IPostCreateResponse extends IPostCreateRequest {
  id: number
}

type IPostUpdateRequest = IPost

type IPostUpdateResponse = Omit<IPost, "views">

interface IPostSearchParams {
  limit: number
  skip: number
  searchQuery: string
  sortBy: string
  sortOrder: string
}

export type {
  IPost,
  IPostWithAuthor,
  IPostListResponse,
  IPostCreateRequest,
  IPostUpdateRequest,
  IPostUpdateResponse,
  IPostSearchParams,
  IPostCreateResponse,
}
