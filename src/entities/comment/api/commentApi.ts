import { ICommentInsertRequest, ICommentListResponse, ICommentUpdateRequest } from "@/entities/comment/model/types"

const selectComments = async (postId: number): Promise<ICommentListResponse> => {
  const response = await fetch(`/api/comments/post/${postId}`)
  const data = await response.json()
  return data
}

const InsertComment = async (newComment: ICommentInsertRequest) => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  })
  return response.json()
}

const updateComment = async (id: number, comment: ICommentUpdateRequest) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  })
  return response.json()
}

const deleteComment = async (id: number) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  })
  return response.json()
}

const likeComment = async (id: number, likes: number) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes }),
  })
  return response.json()
}

export { selectComments, InsertComment, updateComment, deleteComment, likeComment }
