import { useMutation } from "@tanstack/react-query"
import { fetcher } from "@/shared/api/fetcher"
import { ICommentUpdateRequest, ICommentUpdateResponse } from "@/entities/comment/model/types"

const updateComment = (id: number, comment: ICommentUpdateRequest) =>
  fetcher.put<ICommentUpdateResponse>(`comments/${id}`, {
    body: JSON.stringify(comment),
  })

const useUpdateComment = () =>
  useMutation({
    mutationFn: ({ id, comment }: { id: number; comment: ICommentUpdateRequest }) => updateComment(id, comment),
  })

export default useUpdateComment
