import { highlightText } from "@/shared/lib/helpers"
import TagItem from "@/features/post/ui/TagItem"

interface PostTitleProps {
  post: {
    title: string
    tags: string[]
  }
  selectedTag: string
  searchQuery: string
}

const PostTitle = ({ post, selectedTag, searchQuery }: PostTitleProps) => {
  return (
    <div className="space-y-1">
      <div>{highlightText(post.title, searchQuery)}</div>

      <div className="flex flex-wrap gap-1">
        {post.tags?.map((tag) => <TagItem key={tag} tag={tag} onClick={() => {}} selectedTag={selectedTag} />)}
      </div>
    </div>
  )
}

export default PostTitle
