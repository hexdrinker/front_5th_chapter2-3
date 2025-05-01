interface IComment {
  id: number
  postId: number
  likes: number
  body: string
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

interface ICommentCreateResponse {
  id: number
  postId: number
  body: string
  user: {
    fullName: string
    id: number
    username: string
  }
}

interface ICommentLikeResponse extends ICommentCreateResponse {
  likes: number
}

type ICommentUpdateResponse = ICommentCreateResponse

export type {
  IComment,
  ICommentListResponse,
  ICommentInsertRequest,
  ICommentUpdateRequest,
  ICommentCreateResponse,
  ICommentUpdateResponse,
  ICommentLikeResponse,
}
