import { Button } from "@/shared/ui/button"
import { MessageSquare } from "lucide-react"

interface DetailButtonProps {
  onClick: () => void
}

const DetailButton = ({ onClick }: DetailButtonProps) => {
  return (
    <Button variant="ghost" size="sm" onClick={onClick}>
      <MessageSquare className="w-4 h-4" />
    </Button>
  )
}

export default DetailButton
