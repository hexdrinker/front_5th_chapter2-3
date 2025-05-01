import { useAtom, useSetAtom } from "jotai"
import { showDetailDialogAtom } from "@/features/post/model/store"
import { highlightText } from "@/shared/lib/helpers"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog"
import { selectedPostAtom } from "@/entities/post/model/store"
import CommentAddSection from "@/features/comment/ui/CommentAddSection"
import CommentList from "@/features/comment/ui/CommentList"
import { showAddCommentDialogAtom } from "@/features/comment/model/store"
import { useQueryParams } from "@/shared/lib/useQueryParams"

const DialogPostDetail = () => {
  const setShowAddCommentDialog = useSetAtom(showAddCommentDialogAtom)
  const [showDetailDialog, setShowDetailDialog] = useAtom(showDetailDialogAtom)
  const [selectedPost] = useAtom(selectedPostAtom)
  const { searchQuery } = useQueryParams()

  return (
    <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title || "", searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body || "", searchQuery)}</p>
          <div className="mt-2">
            <CommentAddSection onClick={() => setShowAddCommentDialog(true)} />
            {selectedPost?.id && <CommentList postId={selectedPost?.id} />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogPostDetail
