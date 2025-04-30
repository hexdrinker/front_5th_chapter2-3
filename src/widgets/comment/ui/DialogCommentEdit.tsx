import { useAtom, useSetAtom } from "jotai"
import { showEditCommentDialogAtom } from "@/features/comment/model/store"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "@/shared/ui"
import { commentsAtom, selectedCommentAtom } from "@/entities/comment/model/store"
import { updateComment } from "@/entities/comment/api/commentApi"
import { IComment } from "@/entities/comment/model/types"

const DialogCommentEdit = () => {
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)
  const setComments = useSetAtom(commentsAtom)
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom)

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
      const response = await updateComment(selectedComment.id, { body: selectedComment.body })
      setComments((prev) => ({
        ...prev,
        [response.postId]: prev[response.postId].map((comment) => (comment.id === response.id ? response : comment)),
      }))
      setShowEditCommentDialog(false)
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={selectedComment?.body || ""} onChange={onChange} />
          <Button onClick={handleClickUpdateButton}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogCommentEdit
