import { useMutation } from "@tanstack/react-query"
import { fetcher } from "@/shared/api/fetcher"
import { IPostCreateRequest, IPostCreateResponse } from "@/entities/post/model/types"

const createPost = (newPost: IPostCreateRequest) =>
  fetcher.post<IPostCreateResponse>("posts/add", {
    body: JSON.stringify(newPost),
  })

const useCreatePost = () =>
  useMutation({
    mutationFn: (newPost: IPostCreateRequest) => createPost(newPost),
  })

export default useCreatePost
