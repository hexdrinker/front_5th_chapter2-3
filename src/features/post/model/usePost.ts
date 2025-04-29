import { useAtom, useSetAtom } from "jotai"
import { postsAtom, postsTotalAtom, selectedPostAtom } from "@/entities/post/model/store"
import { createPostItem, selectPostList, updatePostItem } from "@/entities/post/api/postApi"
import { selectUserList } from "@/entities/user/api/userApi"
import { IPostInsertRequest, IPostSearchParams, IPostUpdateRequest, IPostWithAuthor } from "@/entities/post/model/types"
import { newPostAtom, showAddDialogAtom, showEditDialogAtom } from "@/features/post/model/store"

const usePost = () => {
  const [posts, setPosts] = useAtom(postsAtom)
  const [total, setTotal] = useAtom(postsTotalAtom)
  const [selectedPost] = useAtom(selectedPostAtom)
  const setShowAddDialog = useSetAtom(showAddDialogAtom)
  const setShowEditDialog = useSetAtom(showEditDialogAtom)
  const [, setNewPost] = useAtom(newPostAtom)

  const fetchPosts = async (searchParams: IPostSearchParams) => {
    try {
      const postsResponse = await selectPostList(searchParams)
      const usersResponse = await selectUserList()

      const { posts, total } = postsResponse
      const { users } = usersResponse

      const postsWithAuthor: IPostWithAuthor[] = posts.map((post) => ({
        ...post,
        author: users.find((user) => user.id === post.userId),
      }))
      setPosts(postsWithAuthor)
      setTotal(total)
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    }
  }

  const addPost = async (newPost: IPostInsertRequest) => {
    try {
      const response = await createPostItem(newPost)
      setPosts([response, ...posts])
      setShowAddDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  const updatePost = async (post: IPostUpdateRequest) => {
    try {
      const response = await updatePostItem(post)
      setPosts(posts.map((p) => (p.id === post.id ? response : p)))
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  return { posts, setPosts, total, selectedPost, fetchPosts, addPost, updatePost }
}

export default usePost
