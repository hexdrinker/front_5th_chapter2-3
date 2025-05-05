import { useMutation } from "@tanstack/react-query"
import { fetcher } from "@/shared/api/fetcher"
import { IPostUpdateRequest } from "@/entities/post/model/types"

const deletePost = (id: number) => fetcher.delete<IPostUpdateRequest>(`posts/${id}`)

const useDeletePost = () =>
  useMutation({
    mutationFn: (id: number) => deletePost(id),
  })

export default useDeletePost
