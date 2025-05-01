import { atom } from "jotai"
import { IComment } from "@/entities/comment/model/types"

export const commentsAtom = atom<IComment[]>([])

export const selectedCommentAtom = atom<IComment | null>(null)
