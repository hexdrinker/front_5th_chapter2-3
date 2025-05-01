import { useMemo } from "react"
import PostList from "@/features/post/ui/PostList"

import { useUsersQuery } from "@/entities/user/api/queries"
import { usePostsByTagQuery, usePostsQuery } from "@/entities/post/api/queries"
import { useQueryParams } from "@/shared/lib/useQueryParams"

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/shared/ui"
import { postsAtom } from "@/entities/post/model/store"
import { useAtomValue } from "jotai"

const PostListTable = () => {
  const posts = useAtomValue(postsAtom)
  const { skip, limit, searchQuery, tag, initialized } = useQueryParams()

  const { isLoading: postsLoading } = usePostsQuery(limit, skip, {
    enabled: !tag && initialized,
  })
  const { isLoading: tagPostsLoading } = usePostsByTagQuery(tag, {
    enabled: !!tag && initialized,
  })

  const { data: usersData } = useUsersQuery()
  const users = useMemo(() => usersData?.users || [], [usersData])
  const loading = useMemo(() => postsLoading || tagPostsLoading, [postsLoading, tagPostsLoading])

  const postsWithAuthor = useMemo(() => {
    return posts?.map((post) => ({
      ...post,
      author: users.find((user) => user.id === post.userId),
    }))
  }, [posts, users])

  if (loading) {
    return <div className="flex justify-center p-4">로딩 중...</div>
  }

  if (!postsWithAuthor || !postsWithAuthor.length) {
    return null
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
        <PostList posts={postsWithAuthor} searchQuery={searchQuery} />
      </TableBody>
    </Table>
  )
}

export default PostListTable
