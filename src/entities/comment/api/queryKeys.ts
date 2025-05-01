import { fetcher } from "@/shared/api/fetcher"
import { ICommentListResponse } from "@/entities/comment/model/types"

export const commentQueryKeys = {
  list: (postId: number) => ({
    queryKey: [postId, "list"],
    queryFn: () => fetcher.get<ICommentListResponse>(`comments/post/${postId}`),
  }),
}
