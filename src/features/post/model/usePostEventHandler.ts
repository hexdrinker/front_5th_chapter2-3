import { useSetAtom } from "jotai"

import { showDetailDialogAtom, showEditDialogAtom } from "@/features/post/model/store"
import { showUserDialogAtom } from "@/features/user/model/store"

import { selectedUserIdAtom } from "@/entities/user/model/store"
import { IPostWithAuthor } from "@/entities/post/model/types"
import { IUser } from "@/entities/user/model/types"
import { useDeletePost } from "@/entities/post/api/mutations"
import usePostStore from "@/entities/post/model/usePostStore"

const usePostEventHandler = () => {
  const setShowDetailDialog = useSetAtom(showDetailDialogAtom)
  const setShowEditDialog = useSetAtom(showEditDialogAtom)
  const setSelectedUserId = useSetAtom(selectedUserIdAtom)
  const setShowUserDialog = useSetAtom(showUserDialogAtom)
  const { mutate: deletePostMutation } = useDeletePost()
  const { deletePost, setSelectedPost } = usePostStore()

  const handleClickPostDetail = (post: IPostWithAuthor) => {
    setSelectedPost(post)
    setShowDetailDialog(true)
  }

  const handleClickPostEdit = (post: IPostWithAuthor) => {
    setSelectedPost(post)
    setShowEditDialog(true)
  }

  const handleClickPostDelete = async (id: number) => {
    try {
      await deletePostMutation(id)
      deletePost(id)
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  const handleClickPostAuthor = async (user?: IUser) => {
    if (!user) {
      return
    }
    setSelectedUserId(user.id)
    setShowUserDialog(true)
  }

  return {
    handleClickPostDetail,
    handleClickPostEdit,
    handleClickPostDelete,
    handleClickPostAuthor,
  }
}

export default usePostEventHandler
