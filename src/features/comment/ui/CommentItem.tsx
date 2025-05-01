import { useSetAtom } from "jotai"

import CommentItemContent from "@/features/comment/ui/CommentItemContent"
import CommentLikeButton from "@/features/comment/ui/CommentLikeButton"
import CommentEditButton from "@/features/comment/ui/CommentEditButton"
import CommentDeleteButton from "@/features/comment/ui/CommentDeleteButton"

import { showEditCommentDialogAtom } from "@/features/comment/model/store"

import { IComment } from "@/entities/comment/model/types"
import { commentsAtom, selectedCommentAtom } from "@/entities/comment/model/store"
import { useLikeComment, useDeleteComment } from "@/entities/comment/api/mutations"

interface CommentItemProps {
  postId: number
  comment: IComment
  searchQuery: string
}

const CommentItem = ({ postId, comment, searchQuery }: CommentItemProps) => {
  const setComments = useSetAtom(commentsAtom)
  const setSelectedComment = useSetAtom(selectedCommentAtom)
  const setShowEditCommentDialog = useSetAtom(showEditCommentDialogAtom)
  const { mutate: deleteComment } = useDeleteComment()
  const { mutate: likeComment } = useLikeComment()

  const handleClickLikeButton = async () => {
    try {
      await likeComment(
        { id: comment.id, likes: comment.likes + 1 },
        {
          onSuccess: (data) => {
            setComments((prev) => ({
              ...prev,
              [postId]: prev[postId].map((item) => (item.id === data.id ? { ...data, likes: item.likes + 1 } : item)),
            }))
          },
        },
      )
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
      <div className="flex items-center space-x-1">
        <CommentLikeButton likes={comment.likes} onClick={handleClickLikeButton} />
        <CommentEditButton onClick={handleClickEditButton} />
        <CommentDeleteButton onClick={handleClickDeleteButton} />
      </div>
    </div>
  )
}

export default CommentItem
