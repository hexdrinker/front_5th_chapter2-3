import { useAtom, useSetAtom } from "jotai"
import SearchForm from "@/features/post/ui/SearchForm"
import TagFilter from "@/features/post/ui/TagFilter"
import SortingFilter from "@/features/post/ui/SortingFilter"
import OrderSortingFilter from "@/features/post/ui/OrderSortingFilter"
import usePost from "@/features/post/model/usePost"
import { tagAtom } from "@/shared/model/queryParams"
import { searchPostList } from "@/entities/post/api/postApi"
import { useQueryParams } from "@/shared/lib/useQueryParams"
import { postsLoadingAtom } from "@/entities/post/model/store"
import useTag from "@/entities/tag/model/useTag"

const FilterSection = () => {
  const setPostsLoading = useSetAtom(postsLoadingAtom)
  const [selectedTag, setSelectedTag] = useAtom(tagAtom)
  const { fetchPosts, setPosts, setTotal, fetchPostsByTag } = usePost()
  const { tags } = useTag()
  const { skip, limit, searchQuery, setSearchQuery, sortBy, setSortBy, sortOrder, setSortOrder, updateQueryParams } =
    useQueryParams()

  const handleChangeTag = (value: string) => {
    setSelectedTag(value)
    fetchPostsByTag(value)
    updateQueryParams()
  }

  const handleSearchPost = async () => {
    if (!searchQuery) {
      fetchPosts({ skip, limit, searchQuery, sortBy, sortOrder })
      return
    }

    try {
      setPostsLoading(true)
      const response = await searchPostList(searchQuery)
      const { posts, total } = response
      setPosts(posts)
      setTotal(total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    } finally {
      setPostsLoading(false)
    }
  }

  const handleChangeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleChangeSortBy = (sortBy: string) => {
    setSortBy(sortBy)
  }

  const handleChangeSortOrder = (sortOrder: string) => {
    setSortOrder(sortOrder)
  }

  return (
    <div className="flex gap-4">
      <SearchForm value={searchQuery} onChange={handleChangeSearchQuery} searchPosts={handleSearchPost} />
      <TagFilter tags={tags} selectedTag={selectedTag} onValueChange={handleChangeTag} />
      <SortingFilter value={sortBy} onValueChange={handleChangeSortBy} />
      <OrderSortingFilter value={sortOrder} onValueChange={handleChangeSortOrder} />
    </div>
  )
}

export default FilterSection
