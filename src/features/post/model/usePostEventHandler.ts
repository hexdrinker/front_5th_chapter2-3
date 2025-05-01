import { postsAtom, selectedPostAtom } from "@/entities/post/model/store"
import { IPost } from "@/entities/post/model/types"
import { IUser } from "@/entities/user/model/types"
import { selectUserItem } from "@/entities/user/api/userApi"
import { showDetailDialogAtom, showEditDialogAtom } from "@/features/post/model/store"
import { useAtom, useSetAtom } from "jotai"
import { selectedUserAtom } from "@/entities/user/model/store"
import { showUserModalAtom } from "@/features/user/model/store"
import { useDeleteComment } from "@/entities/comment/api/mutations"

const usePostEventHandler = () => {
  const [posts, setPosts] = useAtom(postsAtom)
  const setSelectedPost = useSetAtom(selectedPostAtom)
  const setShowDetailDialog = useSetAtom(showDetailDialogAtom)
  const setShowEditDialog = useSetAtom(showEditDialogAtom)
  const setSelectedUser = useSetAtom(selectedUserAtom)
  const setShowUserModal = useSetAtom(showUserModalAtom)
  const { mutate: deleteComment } = useDeleteComment()

  const handleClickPostDetail = (post: IPost) => {
    setSelectedPost(post)
    setShowDetailDialog(true)
  }

  const handleClickPostEdit = (post: IPost) => {
    setSelectedPost(post)
    setShowEditDialog(true)
  }

  const handleClickPostDelete = async (id: number) => {
    try {
      await deleteComment(id)
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  const handleClickPostAuthor = async (user?: IUser) => {
    if (!user) {
      return
    }

    try {
      const response = await selectUserItem(user.id)
      setSelectedUser(response)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  return {
    handleClickPostDetail,
    handleClickPostEdit,
    handleClickPostDelete,
    handleClickPostAuthor,
  }
}

export default usePostEventHandler
