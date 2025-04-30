import { useSetAtom } from "jotai"

import CommentItemContent from "@/features/comment/ui/CommentItemContent"
import CommentLikeButton from "@/features/comment/ui/CommentLikeButton"
import CommentEditButton from "@/features/comment/ui/CommentEditButton"
import CommentDeleteButton from "@/features/comment/ui/CommentDeleteButton"

import { showEditCommentDialogAtom } from "@/features/comment/model/store"

import { IComment } from "@/entities/comment/model/types"
import { commentsAtom, selectedCommentAtom } from "@/entities/comment/model/store"
import { deleteComment, likeComment } from "@/entities/comment/api/commentApi"

interface CommentItemProps {
  postId: number
  comment: IComment
  searchQuery: string
}

const CommentItem = ({ postId, comment, searchQuery }: CommentItemProps) => {
  const setComments = useSetAtom(commentsAtom)
  const setSelectedComment = useSetAtom(selectedCommentAtom)
  const setShowEditCommentDialog = useSetAtom(showEditCommentDialogAtom)

  const handleClickLikeButton = async () => {
    try {
      const response = await likeComment(comment.id, postId)
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((item) => (item.id === response.id ? { ...response, likes: item.likes + 1 } : item)),
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  const handleClickEditButton = () => {
    setSelectedComment(comment)
    setShowEditCommentDialog(true)
  }

  const handleClickDeleteButton = async () => {
    try {
      await deleteComment(comment.id)
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((item) => item.id !== comment.id),
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  return (
    <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
      <CommentItemContent comment={comment} searchQuery={searchQuery} />
      {/* <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{comment.user.username}:</span>
        <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
      </div> */}
      <div className="flex items-center space-x-1">
        <CommentLikeButton likes={comment.likes} onClick={handleClickLikeButton} />
        <CommentEditButton onClick={handleClickEditButton} />
        <CommentDeleteButton onClick={handleClickDeleteButton} />
        {/* <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId)}>
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{comment.likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedComment(comment)
            setShowEditCommentDialog(true)
          }}
        >
          <Edit2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>
          <Trash2 className="w-3 h-3" />
        </Button> */}
      </div>
    </div>
  )
}

export default CommentItem
