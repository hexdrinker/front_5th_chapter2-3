import { Button } from "@/shared/ui/button"
import { Edit2 } from "lucide-react"

interface CommentEditButtonProps {
  onClick: () => void
}

const CommentEditButton = ({ onClick }: CommentEditButtonProps) => {
  return (
    <Button variant="ghost" size="sm" onClick={onClick}>
      <Edit2 className="w-3 h-3" />
    </Button>
  )
}

export default CommentEditButton
