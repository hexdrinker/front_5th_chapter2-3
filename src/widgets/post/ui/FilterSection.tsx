import { useAtom, useAtomValue, useSetAtom } from "jotai"
import SearchForm from "@/features/post/ui/SearchForm"
import TagFilter from "@/features/post/ui/TagFilter"
import SortingFilter from "@/features/post/ui/SortingFilter"
import OrderSortingFilter from "@/features/post/ui/OrderSortingFilter"
import { searchParamsAtom } from "@/features/post/model/store"
import usePost from "@/features/post/model/usePost"
import { selectedTagAtom, tagsAtom } from "@/entities/tag/model/store"
import { searchPostList, selectPostListByTag } from "@/entities/post/api/postApi"
import { selectUserList } from "@/entities/user/api/userApi"
import usePostParams from "@/features/post/model/usePostParams"
import { useEffect } from "react"
import { selectTags } from "@/entities/tag/api/tagApi"

const FilterSection = () => {
  const tags = useAtomValue(tagsAtom)
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)
  const [searchParams, setSearchParams] = useAtom(searchParamsAtom)
  const { searchQuery, sortBy, sortOrder } = searchParams
  const setTags = useSetAtom(tagsAtom)
  const { fetchPosts, setPosts, setTotal } = usePost()
  const { updateURL } = usePostParams()

  const onTagFilterValueChange = (value: string) => {
    setSelectedTag(value)
    fetchPostsByTag(value)
    updateURL()
  }

  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      fetchPosts(searchParams)
      return
    }
    try {
      const [postsResponse, usersResponse] = await Promise.all([selectPostListByTag(tag), selectUserList()])
      const postsWithUsers = postsResponse.posts.map((post) => ({
        ...post,
        author: usersResponse.users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsResponse.total)
    } catch (e) {
      console.error("태그별 게시물 가져오기 오류:", e)
    }
  }

  const onSearchPosts = async () => {
    if (!searchQuery) {
      fetchPosts(searchParams)
      return
    }

    try {
      const response = await searchPostList(searchQuery)
      const { posts, total } = response
      setPosts(posts)
      setTotal(total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
  }

  const fetchTags = async () => {
    try {
      const response = await selectTags()
      setTags(response)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  return (
    <div className="flex gap-4">
      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={(searchQuery) => setSearchParams({ ...searchParams, searchQuery })}
        searchPosts={onSearchPosts}
      />
      <TagFilter tags={tags} selectedTag={selectedTag} onValueChange={onTagFilterValueChange} />
      <SortingFilter sortBy={sortBy} setSortBy={(sortBy) => setSearchParams({ ...searchParams, sortBy })} />
      <OrderSortingFilter
        sortOrder={sortOrder}
        setSortOrder={(sortOrder) => setSearchParams({ ...searchParams, sortOrder })}
      />
    </div>
  )
}

export default FilterSection
