import { useAtom } from "jotai"
import { showEditDialogAtom } from "@/features/post/model/store"
import { postsAtom, selectedPostAtom } from "@/entities/post/model/store"
import { updatePostItem } from "@/entities/post/api/postApi"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "@/shared/ui"

const DialogPostEdit = () => {
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom)
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)
  const [posts, setPosts] = useAtom(postsAtom)

  const handleClickUpdateButton = async () => {
    if (!selectedPost) {
      return
    }

    try {
      const response = await updatePostItem(selectedPost)
      console.log(response)
      setPosts(posts.map((post) => (post.id === selectedPost.id ? response : post)))
      setShowEditDialog(false)
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
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input name="title" placeholder="제목" value={selectedPost?.title || ""} onChange={onChange} />
          <Textarea name="body" rows={15} placeholder="내용" value={selectedPost?.body || ""} onChange={onChange} />
          <Button onClick={handleClickUpdateButton}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogPostEdit
