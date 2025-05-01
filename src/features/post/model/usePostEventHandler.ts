import { useSetAtom } from "jotai"

import { showDetailDialogAtom, showEditDialogAtom } from "@/features/post/model/store"
import { showUserModalAtom } from "@/features/user/model/store"

import { selectedUserIdAtom } from "@/entities/user/model/store"
import { IPost } from "@/entities/post/model/types"
import { IUser } from "@/entities/user/model/types"
import { selectedPostAtom } from "@/entities/post/model/store"
import { useDeletePost } from "@/entities/post/api/mutations"

const usePostEventHandler = () => {
  const setSelectedPost = useSetAtom(selectedPostAtom)
  const setShowDetailDialog = useSetAtom(showDetailDialogAtom)
  const setShowEditDialog = useSetAtom(showEditDialogAtom)
  const setSelectedUserId = useSetAtom(selectedUserIdAtom)
  const setShowUserModal = useSetAtom(showUserModalAtom)
  const { mutate: deletePost } = useDeletePost()

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
      await deletePost(id)
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  const handleClickPostAuthor = async (user?: IUser) => {
    if (!user) {
      return
    }
    setSelectedUserId(user.id)
    setShowUserModal(true)
  }

  return {
    handleClickPostDetail,
    handleClickPostEdit,
    handleClickPostDelete,
    handleClickPostAuthor,
  }
}

export default usePostEventHandler
