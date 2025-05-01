import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { postQueryKeys } from "@/entities/post/api/queryKeys"
import { IPostListResponse } from "@/entities/post/model/types"

const usePostsQuery = (
  limit: number,
  skip: number,
  options?: Omit<UseQueryOptions<IPostListResponse>, "queryKey" | "queryFn">,
) => {
  return useQuery({ ...postQueryKeys.list({ limit, skip }), ...options })
}

export default usePostsQuery
