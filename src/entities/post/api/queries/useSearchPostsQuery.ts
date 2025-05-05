import { useQueries } from "@tanstack/react-query"
import { postQueryKeys } from "@/entities/post/api/queryKeys"
import { usersQueryKeys } from "@/entities/user/api/queryKeys"

const useSearchPosts = (searchQuery: string) => {
  const [postResponse, userResponse] = useQueries({
    queries: [
      {
        ...postQueryKeys.search({ search: searchQuery }),
        gcTime: 0,
        enabled: false,
      },
      {
        ...usersQueryKeys.list(),
        gcTime: 0,
      },
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
    isError: postResponse.isError || userResponse.isError,
    refetch: async () => {
      await Promise.all([postResponse.refetch(), userResponse.refetch()])
    },
  }
}

export default useSearchPosts
