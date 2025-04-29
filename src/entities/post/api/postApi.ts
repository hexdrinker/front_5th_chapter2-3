import {
  IPostListResponse,
  IPostInsertRequest,
  IPostUpdateRequest,
  IPostSearchParams,
} from "@/entities/post/model/types"

const selectPostList = async (params: IPostSearchParams): Promise<IPostListResponse> => {
  const { limit, skip } = params
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  const data = await response.json()
  return data
}

const createPostItem = async (newPost: IPostInsertRequest) => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
  const data = await response.json()
  return data
}

const updatePostItem = async (post: IPostUpdateRequest) => {
  const response = await fetch(`/api/posts/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })
  const data = await response.json()
  return data
}

const deletePostItem = async (id: number) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  })
  const data = await response.json()
  return data
}

const searchPostList = async (searchQuery: string): Promise<IPostListResponse> => {
  const response = await fetch(`/api/posts/search?q=${searchQuery}`)
  const data = await response.json()
  return data
}

const selectPostListByTag = async (tag: string): Promise<IPostListResponse> => {
  const response = await fetch(`/api/posts/tag/${tag}`)
  const data = await response.json()
  return data
}

export { selectPostList, createPostItem, updatePostItem, deletePostItem, searchPostList, selectPostListByTag }
