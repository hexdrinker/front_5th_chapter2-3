import { useQuery } from "@tanstack/react-query"
import { usersQueryKeys } from "@/entities/user/api/queryKeys"

const useUserQuery = (id: number | null) => useQuery(usersQueryKeys.detail(id))

export default useUserQuery
