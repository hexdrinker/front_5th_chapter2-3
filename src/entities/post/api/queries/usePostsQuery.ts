import { useQueries } from "@tanstack/react-query"
import { postQueryKeys } from "@/entities/post/api/queryKeys"
import { usersQueryKeys } from "@/entities/user/api/queryKeys"
interface Params {
  limit: number
  skip: number
  tag?: string
  sortBy?: string
  sortOrder?: string
}

const usePostsQuery = ({ limit, skip, tag, sortBy, sortOrder }: Params) => {
  const [postResponse, userResponse] = useQueries({
    queries: [
      { ...postQueryKeys.list({ limit, skip, tag, sortBy, sortOrder }), gcTime: 0 },
      { ...usersQueryKeys.list(), gcTime: 0 },
    ],
  })

  const posts =
    postResponse.data?.posts.map((post) => ({
      ...post,
      author: userResponse.data?.users.find((user) => user.id === post.userId),
    })) ?? []

  return {
    posts,
    total: postResponse.data?.total ?? 0,
    isLoading: postResponse.isLoading || userResponse.isLoading,
    refetch: async () => await Promise.all([postResponse.refetch(), userResponse.refetch()]),
  }
}

export default usePostsQuery
