import { useAtom } from "jotai"
import { createPostItem } from "@/entities/post/api/postApi"
import { newPostAtom, showAddDialogAtom } from "@/features/post/model/store"
import { postsAtom } from "@/entities/post/model/store"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "@/shared/ui"

const DialogPostAdd = () => {
  const [posts, setPosts] = useAtom(postsAtom)
  const [newPost, setNewPost] = useAtom(newPostAtom)
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom)

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value })
  }

  const handleClickAddButton = async () => {
    try {
      const response = await createPostItem(newPost)
      setPosts([response, ...posts])
      setShowAddDialog(false)
      setNewPost(newPost)
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input name="title" placeholder="제목" value={newPost.title} onChange={onChange} />
          <Textarea name="body" rows={30} placeholder="내용" value={newPost.body} onChange={onChange} />
          <Input name="userId" type="number" placeholder="사용자 ID" value={newPost.userId} onChange={onChange} />
          <Button onClick={handleClickAddButton}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogPostAdd
