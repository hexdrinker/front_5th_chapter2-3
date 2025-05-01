import { useAtom, useSetAtom } from "jotai"
import { showDetailDialogAtom } from "@/features/post/model/store"
import { highlightText } from "@/shared/lib/helpers"
import { BaseDialog } from "@/shared/ui/dialog"
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
    <BaseDialog title="게시물 상세" open={showDetailDialog} onOpenChange={setShowDetailDialog}>
      <p>{highlightText(selectedPost?.body || "", searchQuery)}</p>
      <div className="mt-2">
        <CommentAddSection onClick={() => setShowAddCommentDialog(true)} />
        {selectedPost?.id && <CommentList postId={selectedPost?.id} />}
      </div>
    </BaseDialog>
  )
}

export default DialogPostDetail
