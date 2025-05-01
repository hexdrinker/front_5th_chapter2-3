import { commentsAtom } from "@/entities/comment/model/store"
import { useAtom } from "jotai"
import CommentItem from "@/features/comment/ui/CommentItem"
import { useEffect } from "react"
import { selectComments } from "@/entities/comment/api/commentApi"
import { useQueryParams } from "@/shared/lib/useQueryParams"

interface CommentListProps {
  postId: number
}

const CommentList = ({ postId }: CommentListProps) => {
  const [comments, setComments] = useAtom(commentsAtom)
  const { searchQuery } = useQueryParams()

  const fetchComments = async () => {
    if (comments[postId]) {
      return
    }

    try {
      const response = await selectComments(postId)
      setComments((prev) => ({ ...prev, [postId]: response.comments }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  if (!comments[postId]) {
    return null
  }

  return (
    <div className="space-y-1">
      {comments[postId]?.map((comment) => (
        <CommentItem key={comment.id} comment={comment} postId={postId} searchQuery={searchQuery} />
      ))}
    </div>
  )
}

export default CommentList
