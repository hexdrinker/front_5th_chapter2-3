import { useMutation } from "@tanstack/react-query"
import { fetcher } from "@/shared/api/fetcher"
import { IPostUpdateRequest, IPostUpdateResponse } from "@/entities/post/model/types"

const updatePost = (post: IPostUpdateRequest) =>
  fetcher.put<IPostUpdateResponse>(`posts/${post.id}`, {
    ...post,
  })

const useUpdatePost = () =>
  useMutation({
    mutationFn: (post: IPostUpdateRequest) => updatePost(post),
  })

export default useUpdatePost
