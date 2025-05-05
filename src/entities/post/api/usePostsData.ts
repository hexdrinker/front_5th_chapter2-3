import { useQueryParams } from "@/shared/lib/useQueryParams"
import { usePostsQuery, useSearchPostsQuery } from "@/entities/post/api/queries"
import { useEffect, useState } from "react"
import usePostStore from "@/entities/post/model/usePostStore"

const usePostsData = () => {
  const { skip, limit, tag, sortOrder, sortBy, searchQuery } = useQueryParams()
  const [isSearchActive, setIsSearchActive] = useState(false)
  const {
    posts: postsBySearch,
    total: totalBySearch,
    isLoading: isSearching,
    refetch: searchPosts,
  } = useSearchPostsQuery(searchQuery)
  const { posts: storedPosts, setPosts } = usePostStore()

  const { posts: defaultPosts, total: defaultTotal, isLoading } = usePostsQuery({ skip, limit, tag, sortOrder, sortBy })

  const hasSearch = searchQuery.trim().length > 0

  const posts = isSearchActive ? postsBySearch : defaultPosts
  const total = isSearchActive ? totalBySearch : defaultTotal
  const loading = isSearchActive ? isSearching : isLoading

  useEffect(() => {
    if (hasSearch) {
      setIsSearchActive(true)
    }
  }, [searchQuery])

  useEffect(() => {
    setIsSearchActive(false)
  }, [skip, limit, tag, sortOrder, sortBy])

  useEffect(() => {
    if (!loading) {
      setPosts(posts)
    }
  }, [loading])

  return {
    posts: storedPosts,
    total,
    loading,
    searchPosts,
  }
}

export default usePostsData
