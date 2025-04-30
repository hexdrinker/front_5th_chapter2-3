import { Button } from "@/shared/ui/button"
import { ThumbsUp } from "lucide-react"

interface CommentLikeButtonProps {
  onClick: () => void
  likes: number
}

const CommentLikeButton = ({ onClick, likes }: CommentLikeButtonProps) => {
  return (
    <Button variant="ghost" size="sm" onClick={onClick}>
      <ThumbsUp className="w-3 h-3" />
      <span className="ml-1 text-xs">{likes}</span>
    </Button>
  )
}

export default CommentLikeButton
