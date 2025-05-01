import { useQuery } from "@tanstack/react-query"
import { tagsQueryKeys } from "@/entities/tag/api/queryKeys"

const useTagsQuery = () => useQuery(tagsQueryKeys.list())

export default useTagsQuery
