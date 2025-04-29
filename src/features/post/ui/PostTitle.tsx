import { highlightText } from "@/shared/lib/helpers"
import TagItem from "@/features/post/ui/TagItem"
import { useAtom } from "jotai"
import { selectedTagAtom } from "@/entities/tag/model/store"

interface PostTitleProps {
  post: {
    title: string
    tags: string[]
  }
  searchQuery: string
}

const PostTitle = ({ post, searchQuery }: PostTitleProps) => {
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)

  return (
    <div className="space-y-1">
      <div>{highlightText(post.title, searchQuery)}</div>

      <div className="flex flex-wrap gap-1">
        {post.tags?.map((tag) => (
          <TagItem key={tag} tag={tag} onClick={() => setSelectedTag(tag)} selectedTag={selectedTag} />
        ))}
      </div>
    </div>
  )
}

export default PostTitle
