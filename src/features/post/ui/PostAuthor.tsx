import { IPostItem } from "@/features/post/model/types"

interface PostAuthorProps {
  post: IPostItem
  onClick: () => void
}

const PostAuthor = ({ post, onClick }: PostAuthorProps) => {
  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={onClick}>
      <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
      <span>{post.author?.username}</span>
    </div>
  )
}

export default PostAuthor
