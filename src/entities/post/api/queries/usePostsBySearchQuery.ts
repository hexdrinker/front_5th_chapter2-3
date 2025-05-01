import { useEffect } from "react"
import { useSetAtom } from "jotai"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { postQueryKeys } from "@/entities/post/api/queryKeys"
import { IPostListResponse } from "@/entities/post/model/types"
import { postsAtom, postsTotalAtom } from "@/entities/post/model/store"

const usePostsBySearchQuery = (
  searchQuery: string,
  options?: Omit<UseQueryOptions<IPostListResponse>, "queryKey" | "queryFn">,
) => {
  const setPosts = useSetAtom(postsAtom)
  const setTotal = useSetAtom(postsTotalAtom)

  const query = useQuery({ ...postQueryKeys.list({ search: searchQuery }), ...options })

  useEffect(() => {
    if (query.data) {
      setPosts(query.data.posts)
      setTotal(query.data.total)
    }
  }, [query.data])

  return query
}

export default usePostsBySearchQuery
