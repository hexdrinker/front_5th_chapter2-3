import { atom } from "jotai"
import type { IPostWithAuthor } from "@/entities/post/model/types"

export const postsAtom = atom<IPostWithAuthor[]>([])

export const postsTotalAtom = atom<number>(0)

export const selectedPostAtom = atom<IPostWithAuthor | null>(null)
