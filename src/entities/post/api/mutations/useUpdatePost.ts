import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fetcher } from "@/shared/api/fetcher"
import { IPostUpdateRequest, IPostUpdateResponse, IPostListResponse, IPost } from "@/entities/post/model/types"
import { postQueryKeys } from "@/entities/post/api/queryKeys"

const updatePost = (post: IPostUpdateRequest) =>
  fetcher.put<IPostUpdateResponse>(`posts/${post.id}`, {
    body: JSON.stringify(post),
  })

const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (post: IPostUpdateRequest) => updatePost(post),
    onSuccess: (updatedPost) => {
      queryClient.getQueriesData<IPostListResponse>({ queryKey: postQueryKeys.all }).forEach(([queryKey, oldData]) => {
        if (!oldData) return

        const updatedPosts = oldData.posts.map((post: IPost) => (post.id === updatedPost.id ? updatedPost : post))

        queryClient.setQueryData(queryKey, {
          ...oldData,
          posts: updatedPosts,
        })
      })
    },
  })
}

export default useUpdatePost
