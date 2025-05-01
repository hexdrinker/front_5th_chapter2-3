import { useAtom, useSetAtom } from "jotai"
import { showEditCommentDialogAtom } from "@/features/comment/model/store"
import { BaseDialog, Button, Textarea } from "@/shared/ui"
import { commentsAtom, selectedCommentAtom } from "@/entities/comment/model/store"
import { IComment } from "@/entities/comment/model/types"
import { useUpdateComment } from "@/entities/comment/api/mutations"

const DialogCommentEdit = () => {
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)
  const setComments = useSetAtom(commentsAtom)
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom)
  const { mutate: updateComment } = useUpdateComment()

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!selectedComment) {
      return
    }

    const comment: IComment = { ...selectedComment, body: e.target.value }
    setSelectedComment(comment)
  }

  const handleClickUpdateButton = async () => {
    if (!selectedComment) {
      return
    }

    try {
      await updateComment(
        { id: selectedComment.id, comment: { body: selectedComment.body } },
        {
          onSuccess: (data) => {
            const newComment: IComment = {
              id: data.id,
              postId: data.postId,
              body: data.body,
              likes: data.likes,
              user: {
                fullName: data.user.fullName,
                id: data.user.id,
                username: data.user.username,
              },
            }
            setComments((prev) => prev.map((item) => (item.id === data.id ? newComment : item)))
            setShowEditCommentDialog(false)
          },
        },
      )
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  return (
    <BaseDialog title="댓글 수정" open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <Textarea placeholder="댓글 내용" value={selectedComment?.body || ""} onChange={onChange} />
      <Button onClick={handleClickUpdateButton}>댓글 업데이트</Button>
    </BaseDialog>
  )
}

export default DialogCommentEdit
