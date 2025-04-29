import PostItem from "@/features/post/ui/PostItem"
import usePost from "@/features/post/model/usePost"
import { useEffect } from "react"

const PostList = () => {
  const { posts, fetchPosts } = usePost()

  useEffect(() => {
    fetchPosts({ limit: 10, skip: 0, search: "", sortBy: "createdAt", sortOrder: "desc" })
  }, [])

  if (!posts.length) {
    return null
  }

  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} searchQuery={""} />
      ))}
    </>
  )
}

export default PostList
