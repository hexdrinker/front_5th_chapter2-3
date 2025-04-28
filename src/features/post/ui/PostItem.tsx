import { TableRow, TableCell } from "@/shared/ui/table"

import PostTitle from "@/features/post/ui/PostTitle"
import PostAuthor from "@/features/post/ui/PostAuthor"
import DetailButton from "@/features/post/ui/DetailButton"
import EditButton from "@/features/post/ui/EditButton"
import DeleteButton from "@/features/post/ui/DeleteButton"

import { ReactionCounter } from "@/entities/post/ui"

import usePostEventHandler from "@/features/post/model/usePostEventHandler"
import { IPostItem } from "@/features/post/model/types"

interface PostItemProps {
  post: IPostItem
  selectedTag: string
  searchQuery: string
}

const PostItem = ({ post, selectedTag, searchQuery }: PostItemProps) => {
  const { handleClickPostDetail, handleClickPostEdit, handleClickPostDelete, handleClickPostAuthor } =
    usePostEventHandler()

  return (
    <TableRow key={post.id}>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <PostTitle post={post} selectedTag={selectedTag} searchQuery={searchQuery} />
      </TableCell>
      <TableCell>
        <PostAuthor post={post} onClick={handleClickPostAuthor} />
      </TableCell>
      <TableCell>
        <ReactionCounter likes={0} dislikes={0} />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <DetailButton onClick={handleClickPostDetail} />
          <EditButton onClick={handleClickPostEdit} />
          <DeleteButton onClick={handleClickPostDelete} />
        </div>
      </TableCell>
    </TableRow>
  )
}

export default PostItem
