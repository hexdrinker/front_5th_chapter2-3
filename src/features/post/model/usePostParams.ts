import { selectedTagAtom } from "@/entities/tag/model/store"
import { searchParamsAtom } from "./store"
import { useAtom, useAtomValue } from "jotai"
import { useNavigate } from "react-router-dom"

const usePostParams = () => {
  const navigate = useNavigate()
  const [searchParams] = useAtom(searchParamsAtom)
  const selectedTag = useAtomValue(selectedTagAtom)
  const { skip, limit, searchQuery, sortBy, sortOrder } = searchParams

  const updateURL = () => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }

  return { updateURL }
}

export default usePostParams
