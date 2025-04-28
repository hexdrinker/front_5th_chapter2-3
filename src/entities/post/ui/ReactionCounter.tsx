import { ThumbsDown, ThumbsUp } from "lucide-react"

interface ReactionCounterProps {
  likes: number
  dislikes: number
}

export const ReactionCounter = ({ likes, dislikes }: ReactionCounterProps) => {
  return (
    <div className="flex items-center gap-2">
      <ThumbsUp className="w-4 h-4" />
      <span>{likes || 0}</span>
      <ThumbsDown className="w-4 h-4" />
      <span>{dislikes || 0}</span>
    </div>
  )
}
