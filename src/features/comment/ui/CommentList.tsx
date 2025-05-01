import CommentItem from "@/features/comment/ui/CommentItem"
import { useQueryParams } from "@/shared/lib/useQueryParams"
import { useCommentsQuery } from "@/entities/comment/api/queries"

interface CommentListProps {
  postId: number
}

const CommentList = ({ postId }: CommentListProps) => {
  const { searchQuery } = useQueryParams()
  const { data } = useCommentsQuery(postId)

  if (!data || !data.comments) {
    return null
  }

  return (
    <div className="space-y-1">
      {data.comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} postId={postId} searchQuery={searchQuery} />
      ))}
    </div>
  )
}

export default CommentList
