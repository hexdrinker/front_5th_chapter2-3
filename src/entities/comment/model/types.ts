interface IComment {
  id: number
  postId: number
  body: string
  likes: number
  user: {
    fullName: string
    id: number
    username: string
  }
}

interface ICommentListResponse {
  comments: IComment[]
  total: number
  skip: number
  limit: number
}

interface ICommentInsertRequest {
  body: string
  postId: number
  userId: number
}

interface ICommentUpdateRequest {
  body: string
}

type ICommentCreateResponse = {
  id: number
  postId: number
  body: string
  user: {
    id: number
    username: string
    fullName: string
  }
}

type ICommentLikeResponse = IComment

type ICommentUpdateResponse = IComment

export type {
  IComment,
  ICommentListResponse,
  ICommentInsertRequest,
  ICommentUpdateRequest,
  ICommentCreateResponse,
  ICommentUpdateResponse,
  ICommentLikeResponse,
}
