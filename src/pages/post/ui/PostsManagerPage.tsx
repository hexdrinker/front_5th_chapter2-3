import PostListCard from "@/widgets/post/ui/PostListCard"

import DialogPostDetail from "@/widgets/post/ui/DialogPostDetail"
import DialogPostAdd from "@/widgets/post/ui/DialogPostAdd"
import DialogPostEdit from "@/widgets/post/ui/DialogPostEdit"

import DialogCommentAdd from "@/widgets/comment/ui/DialogCommentAdd"
import DialogCommentEdit from "@/widgets/comment/ui/DialogCommentEdit"

import DialogUserDetail from "@/widgets/user/ui/DialogUserDetail"

const PostsManagerPage = () => {
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
