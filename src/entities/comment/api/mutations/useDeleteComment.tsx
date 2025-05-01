import { useMutation } from "@tanstack/react-query"
import { fetcher } from "@/shared/api/fetcher"

const deleteComment = (id: number) => fetcher.delete(`comments/${id}`)

const useDeleteComment = () =>
  useMutation({
    mutationFn: (id: number) => deleteComment(id),
  })

export default useDeleteComment
