import { TableRow, TableCell } from "@/shared/ui/table"

import PostTitle from "@/features/post/ui/PostTitle"
import PostAuthor from "@/features/post/ui/PostAuthor"
import DetailButton from "@/features/post/ui/DetailButton"
import EditButton from "@/features/post/ui/EditButton"
import DeleteButton from "@/features/post/ui/DeleteButton"

import { ReactionCounter } from "@/entities/post/ui"

import usePostEventHandler from "@/features/post/model/usePostEventHandler"
import { IPostWithAuthor } from "@/entities/post/model/types"

interface PostItemProps {
  post: IPostWithAuthor
  searchQuery: string
}

const PostItem = ({ post, searchQuery }: PostItemProps) => {
  const { handleClickPostDetail, handleClickPostEdit, handleClickPostDelete, handleClickPostAuthor } =
    usePostEventHandler()

  return (
    <TableRow key={post.id}>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <PostTitle post={post} searchQuery={searchQuery} />
      </TableCell>
      <TableCell>
        <PostAuthor post={post} onClick={() => handleClickPostAuthor(post.author)} />
      </TableCell>
      <TableCell>
        <ReactionCounter likes={post.reactions?.likes} dislikes={post.reactions?.dislikes} />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <DetailButton onClick={() => handleClickPostDetail(post)} />
          <EditButton onClick={() => handleClickPostEdit(post)} />
          <DeleteButton onClick={() => handleClickPostDelete(post.id)} />
        </div>
      </TableCell>
    </TableRow>
  )
}

export default PostItem
