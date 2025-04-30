import { atom } from "jotai"
import { IComment } from "@/entities/comment/model/types"

export const commentsAtom = atom<Record<number, IComment[]>>({})

export const selectedCommentAtom = atom<IComment | null>(null)
