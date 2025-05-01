import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { usersQueryKeys } from "@/entities/user/api/queryKeys"
import { IUserListResponse } from "@/entities/user/model/types"

const useUsersQuery = (options?: Omit<UseQueryOptions<IUserListResponse>, "queryKey" | "queryFn">) =>
  useQuery({ ...usersQueryKeys.list(), ...options })

export default useUsersQuery
