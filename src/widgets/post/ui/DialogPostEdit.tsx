import { useAtom } from "jotai"
import { showEditDialogAtom } from "@/features/post/model/store"
import { selectedPostAtom } from "@/entities/post/model/store"
import { BaseDialog, Button, Input, Textarea } from "@/shared/ui"
import { useUpdatePost } from "@/entities/post/api/mutations"

const DialogPostEdit = () => {
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom)
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)
  const { mutate: updatePost } = useUpdatePost()

  const handleClickUpdateButton = async () => {
    if (!selectedPost) {
      return
    }

    try {
      await updatePost(selectedPost, {
        onSuccess: () => {
          setShowEditDialog(false)
        },
      })
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!selectedPost) {
      return
    }

    setSelectedPost({
      ...selectedPost,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <BaseDialog title="게시물 수정" open={showEditDialog} onOpenChange={setShowEditDialog}>
      <Input name="title" placeholder="제목" value={selectedPost?.title || ""} onChange={onChange} />
      <Textarea name="body" rows={15} placeholder="내용" value={selectedPost?.body || ""} onChange={onChange} />
      <Button onClick={handleClickUpdateButton}>게시물 업데이트</Button>
    </BaseDialog>
  )
}

export default DialogPostEdit
