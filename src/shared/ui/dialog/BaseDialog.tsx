import { DialogTitle } from "@radix-ui/react-dialog"
import { Dialog } from "./Dialog"
import { DialogContent } from "./DialogContent"
import { DialogHeader } from "./DialogHeader"

interface BaseDialogProps {
  title: string
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const BaseDialog = ({ title, children, open, onOpenChange }: BaseDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">{children}</div>
      </DialogContent>
    </Dialog>
  )
}
