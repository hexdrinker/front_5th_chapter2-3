import { Button } from "@/shared/ui/button"
import { Trash2 } from "lucide-react"

interface CommentDeleteButtonProps {
  onClick: () => void
}

const CommentDeleteButton = ({ onClick }: CommentDeleteButtonProps) => {
  return (
    <Button variant="ghost" size="sm" onClick={onClick}>
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}

export default CommentDeleteButton
