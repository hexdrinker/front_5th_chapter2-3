import { useMutation } from "@tanstack/react-query"
import { fetcher } from "@/shared/api/fetcher"
import { ICommentLikeResponse } from "@/entities/comment/model/types"

const likeComment = (id: number, likes: number) =>
  fetcher.patch<ICommentLikeResponse>(`comments/${id}`, {
    body: JSON.stringify({ likes }),
  })

const useLikeComment = () =>
  useMutation({
    mutationFn: ({ id, likes }: { id: number; likes: number }) => likeComment(id, likes),
  })

export default useLikeComment
