import { Button } from "@/shared/ui/button"
import { Trash2 } from "lucide-react"

interface DeleteButtonProps {
  onClick: () => void
}

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <Button variant="ghost" size="sm" onClick={onClick}>
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}

export default DeleteButton
