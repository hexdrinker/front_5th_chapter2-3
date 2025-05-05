import { atom } from "jotai"
import type { IPostWithAuthor } from "@/entities/post/model/types"

export const postsAtom = atom<IPostWithAuthor[]>([])
export const selectedPostAtom = atom<IPostWithAuthor | null>(null)
