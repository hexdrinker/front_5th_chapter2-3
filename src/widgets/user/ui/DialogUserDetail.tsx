import { BaseDialog } from "@/shared/ui"
import { useAtom, useAtomValue } from "jotai"
import { showUserDialogAtom } from "@/features/user/model/store"
import { selectedUserIdAtom } from "@/entities/user/model/store"
import { useUserQuery } from "@/entities/user/api/queries"

const DialogUserDetail = () => {
  const [showUserDialog, setShowUserDialog] = useAtom(showUserDialogAtom)
  const selectedUserId = useAtomValue(selectedUserIdAtom)
  const { data: user } = useUserQuery(selectedUserId)

  return (
    <BaseDialog title="사용자 정보" open={showUserDialog} onOpenChange={setShowUserDialog}>
      <img src={user?.image} alt={user?.username} className="w-24 h-24 rounded-full mx-auto" />
      <h3 className="text-xl font-semibold text-center">{user?.username}</h3>
      <div className="space-y-2">
        <p>
          <strong>이름:</strong> {user?.firstName} {user?.lastName}
        </p>
        <p>
          <strong>나이:</strong> {user?.age}
        </p>
        <p>
          <strong>이메일:</strong> {user?.email}
        </p>
        <p>
          <strong>전화번호:</strong> {user?.phone}
        </p>
        <p>
          <strong>주소:</strong> {user?.address?.address}, {user?.address?.city}, {user?.address?.state}
        </p>
        <p>
          <strong>직장:</strong> {user?.company?.name} - {user?.company?.title}
        </p>
      </div>
    </BaseDialog>
  )
}

export default DialogUserDetail
