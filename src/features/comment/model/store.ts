import { atom } from "jotai"

export const showAddCommentDialogAtom = atom(false)
export const showEditCommentDialogAtom = atom(false)
export const newCommentAtom = atom({ body: "", postId: null, userId: 1 })
