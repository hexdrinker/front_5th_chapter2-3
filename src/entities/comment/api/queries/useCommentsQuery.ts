import { useQuery } from "@tanstack/react-query"
import { commentQueryKeys } from "@/entities/comment/api/queryKeys"

const useCommentsQuery = (postId: number) => useQuery(commentQueryKeys.list(postId))

export default useCommentsQuery
