import { useEffect } from "react"

import PostListCard from "@/widgets/post/ui/PostListCard"

import DialogPostDetail from "@/widgets/post/ui/DialogPostDetail"
import DialogPostAdd from "@/widgets/post/ui/DialogPostAdd"
import DialogPostEdit from "@/widgets/post/ui/DialogPostEdit"

import DialogCommentAdd from "@/widgets/comment/ui/DialogCommentAdd"
import DialogCommentEdit from "@/widgets/comment/ui/DialogCommentEdit"

import DialogUserDetail from "@/widgets/user/ui/DialogUserDetail"
import { useAtomValue } from "jotai"
import { tagAtom } from "@/shared/model/queryParams"
import usePost from "@/features/post/model/usePost"
import { useQueryParams } from "@/shared/lib/useQueryParams"
import useTag from "@/entities/tag/model/useTag"

const PostsManagerPage = () => {
  const selectedTag = useAtomValue(tagAtom)
  const { fetchPosts, fetchPostsByTag } = usePost()
  const { skip, limit, sortBy, sortOrder, searchQuery } = useQueryParams()
  const { fetchTags } = useTag()

  useEffect(() => {
    fetchTags()
  }, [])

  useEffect(() => {
    console.log(1)
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts({ skip, limit, sortBy, sortOrder, searchQuery })
    }
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  return (
    <>
      <PostListCard />

      <DialogPostAdd />
      <DialogPostEdit />
      <DialogPostDetail />

      <DialogCommentAdd />
      <DialogCommentEdit />

      <DialogUserDetail />
    </>
  )
}

export default PostsManagerPage
