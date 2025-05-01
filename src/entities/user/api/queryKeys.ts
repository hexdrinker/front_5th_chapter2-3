import { fetcher } from "@/shared/api/fetcher"
import { IUserListResponse, IUserDetailResponse } from "@/entities/user/model/types"

export const usersQueryKeys = {
  list: () => ({
    queryKey: ["user", "list"],
    queryFn: () => fetcher.get<IUserListResponse>("users?limit=0&select=username,image"),
  }),
  detail: (id: number | null) => ({
    queryKey: ["user", "detail", id],
    queryFn: () => fetcher.get<IUserDetailResponse>(`users/${id}`),
    enabled: !!id,
  }),
}
