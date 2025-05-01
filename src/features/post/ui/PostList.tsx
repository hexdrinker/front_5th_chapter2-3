import { IPostWithAuthor } from "@/entities/post/model/types"
import PostItem from "@/features/post/ui/PostItem"

interface PostListProps {
  posts: IPostWithAuthor[]
  searchQuery: string
}

const PostList = ({ posts, searchQuery }: PostListProps) => {
  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} searchQuery={searchQuery} />
      ))}
    </>
  )
}

export default PostList
