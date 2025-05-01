import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fetcher } from "@/shared/api/fetcher"
import { IPostCreateRequest, IPostCreateResponse, IPostListResponse } from "@/entities/post/model/types"
import { postQueryKeys } from "@/entities/post/api/queryKeys"

const createPost = (newPost: IPostCreateRequest) =>
  fetcher.post<IPostCreateResponse>("posts/add", {
    body: JSON.stringify(newPost),
  })

const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newPost: IPostCreateRequest) => createPost(newPost),
    onSuccess: (newPost: IPostCreateResponse) => {
      queryClient.getQueriesData<IPostListResponse>({ queryKey: postQueryKeys.all }).forEach(([queryKey, oldData]) => {
        if (!oldData) {
          return
        }

        queryClient.setQueryData(queryKey, {
          ...oldData,
          posts: [newPost, ...(oldData.posts || [])],
          total: (oldData.total || 0) + 1,
        })
      })
    },
  })
}

export default useCreatePost
