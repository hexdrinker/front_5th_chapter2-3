import usePostsData from "@/entities/post/api/usePostsData"
import { useQueryParams } from "@/shared/lib/useQueryParams"
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui"

const Pagination = () => {
  const { total } = usePostsData()
  const { limit, setLimit, skip, setSkip } = useQueryParams()

  const handleChangeLimit = (value: string) => {
    setLimit(Number(value))
  }

  const handleClickPrev = () => {
    setSkip(Math.max(0, skip - limit))
  }

  const handleClickNext = () => {
    setSkip(skip + limit)
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={handleChangeLimit}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button disabled={skip === 0} onClick={handleClickPrev}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={handleClickNext}>
          다음
        </Button>
      </div>
    </div>
  )
}

export default Pagination
