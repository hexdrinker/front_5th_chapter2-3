import PostItem from "@/features/post/ui/PostItem"
import { IPostItem } from "@/features/post/model/types"

interface PostListProps {
  posts: IPostItem[]
  selectedTag: string
  searchQuery: string
}

const PostList = ({ posts, selectedTag, searchQuery }: PostListProps) => {
  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} selectedTag={selectedTag} searchQuery={searchQuery} />
      ))}
    </>
  )
}

export default PostList
