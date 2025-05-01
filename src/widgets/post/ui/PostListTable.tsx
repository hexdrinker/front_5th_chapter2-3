import { postsLoadingAtom } from "@/entities/post/model/store"
import PostList from "@/features/post/ui/PostList"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/shared/ui"
import { useAtomValue } from "jotai"

const PostListTable = () => {
  const loading = useAtomValue(postsLoadingAtom)

  if (loading) {
    return <div className="flex justify-center p-4">로딩 중...</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <PostList />
      </TableBody>
    </Table>
  )
}

export default PostListTable
