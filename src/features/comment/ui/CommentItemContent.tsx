import { IComment } from "@/entities/comment/model/types"
import { highlightText } from "@/shared/lib/helpers"

interface CommentItemContentProps {
  comment: IComment
  searchQuery: string
}

const CommentItemContent = ({ comment, searchQuery }: CommentItemContentProps) => {
  return (
    <div className="flex items-center space-x-2 overflow-hidden">
      <span className="font-medium truncate">{comment?.user?.username}:</span>
      <span className="truncate">{highlightText(comment?.body, searchQuery)}</span>
    </div>
  )
}

export default CommentItemContent
