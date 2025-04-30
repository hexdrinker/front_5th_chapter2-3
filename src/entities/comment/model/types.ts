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

export type { IComment, ICommentListResponse, ICommentInsertRequest, ICommentUpdateRequest }
