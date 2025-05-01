import { useMutation } from "@tanstack/react-query"
import { fetcher } from "@/shared/api/fetcher"
import { ICommentCreateResponse, ICommentInsertRequest } from "@/entities/comment/model/types"

const createComment = (newComment: ICommentInsertRequest) =>
  fetcher.post<ICommentCreateResponse>("comments/add", {
    body: JSON.stringify(newComment),
  })

const useCreateComment = () =>
  useMutation({
    mutationFn: (newComment: ICommentInsertRequest) => createComment(newComment),
  })

export default useCreateComment
