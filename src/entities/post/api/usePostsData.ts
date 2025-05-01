import { useIsFetching, useQueryClient } from "@tanstack/react-query"
import { postQueryKeys } from "@/entities/post/api/queryKeys"
import { IPostListResponse } from "@/entities/post/model/types"

const usePostsData = () => {
  const queryClient = useQueryClient()

  const getCachedPostsData = () => {
    const queries = queryClient.getQueriesData<IPostListResponse>({
      queryKey: postQueryKeys.all,
    })

    type QueryDataTuple = [readonly unknown[], IPostListResponse | undefined]
    const emptyResult: QueryDataTuple = [[], undefined]

    const mostRecentQuery = queries.reduce<QueryDataTuple>((prev, curr) => {
      const [, data] = curr
      if (!prev[1] || (data && data.posts.length > 0)) return curr
      return prev
    }, emptyResult)

    return mostRecentQuery[1] || { posts: [], total: 0 }
  }

  const isFetching = useIsFetching({
    queryKey: postQueryKeys.all,
  })

  return {
    getPostsData: getCachedPostsData,
    isLoading: isFetching > 0,
  }
}

export default usePostsData
