import { useAtom } from "jotai"
import { postsAtom, selectedPostAtom } from "./store"
import { IPostWithAuthor } from "./types"

const usePostStore = () => {
  const [posts, setPosts] = useAtom(postsAtom)
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)

  const createPost = (post: IPostWithAuthor) => {
    setPosts([post, ...posts])
  }

  const updatePost = (updatedPost: IPostWithAuthor) => {
    setPosts(posts.map((post) => (post.id === updatedPost?.id ? updatedPost : post)))
  }

  const deletePost = (id: number) => {
    console.log(`deletePost: ${id}`)
    setPosts(posts.filter((post) => post.id !== id))
  }

  return {
    posts,
    setPosts,
    selectedPost,
    setSelectedPost,
    createPost,
    updatePost,
    deletePost,
  }
}

export default usePostStore
