import { Button, CardHeader, CardTitle } from "@/shared/ui"
import { Plus } from "lucide-react"
import { showAddDialogAtom } from "../model/store"
import { useSetAtom } from "jotai"

const PostCardHeader = () => {
  const setShowAddDialog = useSetAtom(showAddDialogAtom)

  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span>게시물 관리자</span>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          게시물 추가
        </Button>
      </CardTitle>
    </CardHeader>
  )
}

export default PostCardHeader
