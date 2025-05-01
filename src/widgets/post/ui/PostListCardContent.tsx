import { CardContent } from "@/shared/ui"
import FilterSection from "@/widgets/post/ui/FilterSection"
import PostListTable from "@/widgets/post/ui/PostListTable"
import Pagination from "@/widgets/post/ui/Pagination"

const PostListCardContent = () => {
  return (
    <CardContent>
      <div className="flex flex-col gap-4">
        <FilterSection />

        <PostListTable />

        <Pagination />
      </div>
    </CardContent>
  )
}

export default PostListCardContent
