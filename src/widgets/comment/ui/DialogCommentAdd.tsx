import { useCreateComment } from "@/entities/comment/api/mutations"
import { commentsAtom } from "@/entities/comment/model/store"
import { IComment } from "@/entities/comment/model/types"
import usePostStore from "@/entities/post/model/usePostStore"
import { newCommentAtom, showAddCommentDialogAtom } from "@/features/comment/model/store"
import { BaseDialog, Button, Textarea } from "@/shared/ui"
import { useAtom, useSetAtom } from "jotai"

const DialogCommentAdd = () => {
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom)
  const [newComment, setNewComment] = useAtom(newCommentAtom)
  const setComments = useSetAtom(commentsAtom)
  const { mutate: createComment } = useCreateComment()
  const { selectedPost } = usePostStore()

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment({ ...newComment, body: e.target.value })
  }

  const handleClickAddButton = async () => {
    if (!selectedPost) {
      return
    }

    try {
      await createComment(
        { ...newComment, postId: selectedPost.id },
        {
          onSuccess: (data) => {
            const newComment: IComment = {
              id: data.id,
              postId: data.postId,
              body: data.body,
              likes: 0,
              user: {
                fullName: data.user.fullName,
                id: data.user.id,
                username: data.user.username,
              },
            }
            setComments((prev) => [...prev, newComment])
            setShowAddCommentDialog(false)
            setNewComment({ body: "", postId: null, userId: 1 })
          },
        },
      )
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  return (
    <BaseDialog title="새 댓글 추가" open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <Textarea placeholder="댓글 내용" value={newComment.body} onChange={onChange} />
      <Button onClick={handleClickAddButton}>댓글 추가</Button>
    </BaseDialog>
  )
}

export default DialogCommentAdd
