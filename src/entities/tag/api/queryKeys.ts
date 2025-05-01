import { fetcher } from "@/shared/api/fetcher"
import { ITagListResponse } from "@/entities/tag/model/types"

export const tagsQueryKeys = {
  list: () => ({
    queryKey: ["tag", "list"],
    queryFn: () => fetcher.get<ITagListResponse>("posts/tags"),
  }),
}
