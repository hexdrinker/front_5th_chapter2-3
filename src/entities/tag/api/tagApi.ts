import { ITagListResponse } from "@/entities/tag/model/types"

const selectTags = async (): Promise<ITagListResponse> => {
  const response = await fetch("/api/posts/tags")
  const data = await response.json()
  return data
}

export { selectTags }
