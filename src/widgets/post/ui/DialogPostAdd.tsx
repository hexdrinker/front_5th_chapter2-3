import { useAtom } from "jotai"
import { newPostAtom, showAddDialogAtom } from "@/features/post/model/store"
import { BaseDialog, Button, Input, Textarea } from "@/shared/ui"
import { useCreatePost } from "@/entities/post/api/mutations"

const DialogPostAdd = () => {
  const [newPost, setNewPost] = useAtom(newPostAtom)
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom)
  const { mutate: createPost } = useCreatePost()

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value })
  }

  const handleClickAddButton = async () => {
    try {
      await createPost(newPost, {
        onSuccess: () => {
          setShowAddDialog(false)
        },
      })
      setNewPost(newPost)
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  return (
    <BaseDialog title="새 게시물 추가" open={showAddDialog} onOpenChange={setShowAddDialog}>
      <Input name="title" placeholder="제목" value={newPost.title} onChange={onChange} />
      <Textarea name="body" rows={30} placeholder="내용" value={newPost.body} onChange={onChange} />
      <Input name="userId" type="number" placeholder="사용자 ID" value={newPost.userId} onChange={onChange} />
      <Button onClick={handleClickAddButton}>게시물 추가</Button>
    </BaseDialog>
  )
}

export default DialogPostAdd
