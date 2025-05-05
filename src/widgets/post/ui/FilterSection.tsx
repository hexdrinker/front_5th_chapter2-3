import { useAtom } from "jotai"
import SearchForm from "@/features/post/ui/SearchForm"
import TagFilter from "@/features/post/ui/TagFilter"
import SortingFilter from "@/features/post/ui/SortingFilter"
import OrderSortingFilter from "@/features/post/ui/OrderSortingFilter"
import { tagAtom } from "@/shared/model/queryParams"
import { useQueryParams } from "@/shared/lib/useQueryParams"
import { useTagsQuery } from "@/entities/tag/api/queries"
import usePostsData from "@/entities/post/api/usePostsData"

const FilterSection = () => {
  const [selectedTag, setSelectedTag] = useAtom(tagAtom)
  const { data: tags } = useTagsQuery()
  const { searchQuery, setSearchQuery, sortBy, setSortBy, sortOrder, setSortOrder, updateQueryParams } =
    useQueryParams()
  const { searchPosts } = usePostsData()

  const handleChangeTag = (value: string) => {
    setSelectedTag(value)
    updateQueryParams()
  }

  const handleSearchPost = async () => {
    try {
      await searchPosts()
    } catch (error) {
      console.error("게시물 검색 오류:", error)
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
      <TagFilter tags={tags || []} selectedTag={selectedTag} onValueChange={handleChangeTag} />
      <SortingFilter value={sortBy} onValueChange={handleChangeSortBy} />
      <OrderSortingFilter value={sortOrder} onValueChange={handleChangeSortOrder} />
    </div>
  )
}

export default FilterSection
