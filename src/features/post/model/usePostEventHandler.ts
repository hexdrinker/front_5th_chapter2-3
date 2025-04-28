const usePostEventHandler = () => {
  const handleClickPostDetail = () => {
    // openPostDetail(post)
  }

  const handleClickPostEdit = () => {
    /*
    setSelectedPost(post)
    setShowEditDialog(true)
    */
  }

  const handleClickPostDelete = () => {
    // deletePost(post.id)
  }

  const handleClickPostAuthor = () => {
    // openUserModal(post.author)
  }

  return {
    handleClickPostDetail,
    handleClickPostEdit,
    handleClickPostDelete,
    handleClickPostAuthor,
  }
}

export default usePostEventHandler
