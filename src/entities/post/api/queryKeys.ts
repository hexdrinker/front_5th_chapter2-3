import { fetcher } from "@/shared/api/fetcher"
import { IPostListResponse } from "@/entities/post/model/types"

export const postQueryKeys = {
  all: ["posts"] as const,
  list: (params: { limit?: number; skip?: number; tag?: string; search?: string }) => ({
    queryKey: [...postQueryKeys.all, params],
    queryFn: () => {
      if (params.tag) {
        return fetcher.get<IPostListResponse>(`posts/tag/${params.tag}`)
      }
      if (params.search) {
        return fetcher.get<IPostListResponse>(`posts/search?q=${params.search}`)
      }
      return fetcher.get<IPostListResponse>(`posts?limit=${params.limit}&skip=${params.skip}`)
    },
  }),
}
