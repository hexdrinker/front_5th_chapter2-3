import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { ITag } from "@/entities/tag/model/types"

interface TagFilterProps {
  tags: ITag[]
  selectedTag: string
  onValueChange: (value: string) => void
}

const TagFilter = ({ tags, selectedTag, onValueChange }: TagFilterProps) => {
  return (
    <Select value={selectedTag} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tags.map((tag) => (
          <SelectItem key={tag.url} value={tag.slug}>
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default TagFilter
