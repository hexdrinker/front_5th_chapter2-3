import { IApiInsertPostRequest, IApiSelectPostSearchParams, IApiUpdatePostRequest } from "../model/types"

const fetchPosts = async (params: IApiSelectPostSearchParams) => {
  const { limit, skip } = params
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  const data = await response.json()
  return data
}

const addPost = async (newPost: IApiInsertPostRequest) => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
  const data = await response.json()
  return data
}

const updatePost = async (post: IApiUpdatePostRequest) => {
  const response = await fetch(`/api/posts/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })
  const data = await response.json()
  return data
}

const deletePost = async (id: number) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  })
  const data = await response.json()
  return data
}

const searchPosts = async (searchQuery: string) => {
  const response = await fetch(`/api/posts/search?q=${searchQuery}`)
  const data = await response.json()
  return data
}

const fetchPostsByTag = async (tag: string) => {
  const response = await fetch(`/api/posts/tag/${tag}`)
  const data = await response.json()
  return data
}

export { fetchPosts, addPost, updatePost, deletePost, searchPosts, fetchPostsByTag }
