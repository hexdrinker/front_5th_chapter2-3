import usePostsData from "@/entities/post/api/usePostsData"
import PostList from "@/features/post/ui/PostList"
import { useQueryParams } from "@/shared/lib/useQueryParams"

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/shared/ui"

const PostListTable = () => {
  const { searchQuery } = useQueryParams()
  const { posts, loading } = usePostsData()

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
        <PostList posts={posts} searchQuery={searchQuery} />
      </TableBody>
    </Table>
  )
}

export default PostListTable
