import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { skipAtom, limitAtom, searchQueryAtom, sortByAtom, sortOrderAtom, tagAtom } from "@/shared/model/queryParams"
import { useAtom } from "jotai"

export const useQueryParams = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const [skip, setSkip] = useAtom(skipAtom)
  const [limit, setLimit] = useAtom(limitAtom)
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  const [sortBy, setSortBy] = useAtom(sortByAtom)
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom)
  const [tag, setTag] = useAtom(tagAtom)

  const updateQueryParams = () => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (tag) params.set("tag", tag)
    navigate(`?${params.toString()}`)
  }

  useEffect(() => {
    setSkip(parseInt(queryParams.get("skip") || "0"))
    setLimit(parseInt(queryParams.get("limit") || "10"))
    setSearchQuery(queryParams.get("search") || "")
    setSortBy(queryParams.get("sortBy") || "")
    setSortOrder(queryParams.get("sortOrder") || "asc")
    setTag(queryParams.get("tag") || "")
  }, [location.search])

  useEffect(() => {
    updateQueryParams()
  }, [skip, limit, sortBy, sortOrder, tag])

  return {
    skip,
    setSkip,
    limit,
    setLimit,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    tag,
    setTag,
    updateQueryParams,
  }
}
