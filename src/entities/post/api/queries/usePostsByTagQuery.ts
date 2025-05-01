import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { postQueryKeys } from "@/entities/post/api/queryKeys"
import { IPostListResponse } from "@/entities/post/model/types"

const usePostsByTagQuery = (
  tag: string,
  options?: Omit<UseQueryOptions<IPostListResponse>, "queryKey" | "queryFn">,
) => {
  return useQuery({ ...postQueryKeys.list({ tag }), ...options })
}

export default usePostsByTagQuery
