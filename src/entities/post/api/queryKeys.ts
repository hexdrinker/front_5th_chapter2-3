import { fetcher } from "@/shared/api/fetcher"
import { IPostListResponse } from "@/entities/post/model/types"

export const postQueryKeys = {
  all: ["posts"] as const,
  list: (params: { limit: number; skip: number; tag?: string; sortOrder?: string; sortBy?: string }) => ({
    queryKey: [
      ...postQueryKeys.all,
      {
        limit: params.limit,
        skip: params.skip,
        tag: params.tag,
        sortOrder: params.sortOrder,
        sortBy: params.sortBy,
      },
    ],
    queryFn: () => {
      if (params.tag) {
        return fetcher.get<IPostListResponse>(`posts/tag/${params.tag}`)
      }
      return fetcher.get<IPostListResponse>(
        `posts?limit=${params.limit}&skip=${params.skip}&sortBy=${params.sortBy}&sortOrder=${params.sortOrder}`,
      )
    },
  }),
  search: (params: { search: string }) => ({
    queryKey: [...postQueryKeys.all, params.search],
    queryFn: () => fetcher.get<IPostListResponse>(`posts/search?q=${params.search}`),
  }),
}
