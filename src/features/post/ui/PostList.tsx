import PostItem from "@/features/post/ui/PostItem"
import usePost from "@/features/post/model/usePost"
import { useQueryParams } from "@/shared/lib/useQueryParams"

const PostList = () => {
  const { posts } = usePost()
  const { searchQuery } = useQueryParams()

  if (!posts.length) {
    return null
  }

  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} searchQuery={searchQuery} />
      ))}
    </>
  )
}

export default PostList
