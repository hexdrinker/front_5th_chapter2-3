import { useQuery } from "@tanstack/react-query"
import { commentQueryKeys } from "@/entities/comment/api/queryKeys"
import { useEffect } from "react"
import { commentsAtom } from "@/entities/comment/model/store"
import { useSetAtom } from "jotai"

const useCommentsQuery = (postId: number) => {
  const setComments = useSetAtom(commentsAtom)
  const query = useQuery(commentQueryKeys.list(postId))

  useEffect(() => {
    if (query.data) {
      setComments(query.data.comments)
    }
  }, [query.data])
}

export default useCommentsQuery
