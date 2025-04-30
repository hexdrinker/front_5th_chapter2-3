import { InsertComment } from "@/entities/comment/api/commentApi"
import { commentsAtom } from "@/entities/comment/model/store"
import { selectedPostAtom } from "@/entities/post/model/store"
import { newCommentAtom, showAddCommentDialogAtom } from "@/features/comment/model/store"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "@/shared/ui"
import { useAtom, useAtomValue, useSetAtom } from "jotai"

const DialogCommentAdd = () => {
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom)
  const [newComment, setNewComment] = useAtom(newCommentAtom)
  const setComments = useSetAtom(commentsAtom)
  const selectedPost = useAtomValue(selectedPostAtom)

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment({ ...newComment, body: e.target.value })
  }

  const handleClickAddButton = async () => {
    if (!selectedPost) {
      return
    }

    try {
      const response = await InsertComment({ ...newComment, postId: selectedPost.id })
      setComments((prev) => ({ ...prev, [response.postId]: [...(prev[response.postId] || []), response] }))
      setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: null, userId: 1 })
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={newComment.body} onChange={onChange} />
          <Button onClick={handleClickAddButton}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogCommentAdd
