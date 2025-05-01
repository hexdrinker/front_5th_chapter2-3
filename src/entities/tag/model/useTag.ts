import { useAtom } from "jotai"
import { selectTags } from "@/entities/tag/api/tagApi"
import { tagsAtom } from "@/entities/tag/model/store"

const useTag = () => {
  const [tags, setTags] = useAtom(tagsAtom)

  const fetchTags = async () => {
    try {
      const response = await selectTags()
      setTags(response)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  return {
    fetchTags,
    tags,
  }
}

export default useTag
