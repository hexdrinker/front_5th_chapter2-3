import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fetcher } from "@/shared/api/fetcher"
import { IPostUpdateRequest, IPostListResponse, IPost } from "@/entities/post/model/types"
import { postQueryKeys } from "@/entities/post/api/queryKeys"

const deletePost = (id: number) => fetcher.delete<IPostUpdateRequest>(`posts/${id}`)

const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: (_, deletedId) => {
      queryClient.getQueriesData<IPostListResponse>({ queryKey: postQueryKeys.all }).forEach(([queryKey, oldData]) => {
        if (!oldData) {
          return
        }

        const filteredPosts = oldData.posts.filter((post: IPost) => post.id !== deletedId)
        queryClient.setQueryData(queryKey, {
          ...oldData,
          posts: filteredPosts,
          total: Math.max(0, (oldData.total || 0) - 1),
        })
      })
    },
  })
}

export default useDeletePost
