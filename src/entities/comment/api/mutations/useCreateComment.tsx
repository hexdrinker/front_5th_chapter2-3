import { useMutation } from "@tanstack/react-query"
import { fetcher } from "@/shared/api/fetcher"
import { ICommentCreateResponse, ICommentCreateRequest } from "@/entities/comment/model/types"

const createComment = (newComment: ICommentCreateRequest) =>
  fetcher.post<ICommentCreateResponse>("comments/add", {
    ...newComment,
  })

const useCreateComment = () =>
  useMutation({
    mutationFn: (newComment: ICommentCreateRequest) => createComment(newComment),
  })

export default useCreateComment
