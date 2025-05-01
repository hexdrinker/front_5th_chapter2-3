import { Input } from "@/shared/ui/form"
import { Search } from "lucide-react"

interface SearchFormProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  searchPosts: () => void
}

const SearchForm = ({ value, onChange, searchPosts }: SearchFormProps) => {
  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={value}
          onChange={onChange}
          onKeyPress={(e) => e.key === "Enter" && searchPosts()}
        />
      </div>
    </div>
  )
}

export default SearchForm
