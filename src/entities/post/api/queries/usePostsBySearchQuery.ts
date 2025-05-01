import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { postQueryKeys } from "@/entities/post/api/queryKeys"
import { IPostListResponse } from "@/entities/post/model/types"

const usePostsBySearchQuery = (
  searchQuery: string,
  options?: Omit<UseQueryOptions<IPostListResponse>, "queryKey" | "queryFn">,
) => {
  return useQuery({ ...postQueryKeys.list({ search: searchQuery }), ...options })
}

export default usePostsBySearchQuery
