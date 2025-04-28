import { Button } from "@/shared/ui/button"
import { Edit2 } from "lucide-react"

interface EditButtonProps {
  onClick: () => void
}

const EditButton = ({ onClick }: EditButtonProps) => {
  return (
    <Button variant="ghost" size="sm" onClick={onClick}>
      <Edit2 className="w-4 h-4" />
    </Button>
  )
}

export default EditButton
