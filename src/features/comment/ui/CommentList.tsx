import CommentItem from "@/features/comment/ui/CommentItem"
import { useQueryParams } from "@/shared/lib/useQueryParams"
import { useCommentsQuery } from "@/entities/comment/api/queries"
import { commentsAtom } from "@/entities/comment/model/store"
import { useAtomValue } from "jotai"

interface CommentListProps {
  postId: number
}

const CommentList = ({ postId }: CommentListProps) => {
  const { searchQuery } = useQueryParams()
  useCommentsQuery(postId)
  const comments = useAtomValue(commentsAtom)

  return (
    <div className="space-y-1">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} searchQuery={searchQuery} />
      ))}
    </div>
  )
}

export default CommentList
