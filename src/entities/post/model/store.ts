import { atom } from "jotai"
import type { IPost, IPostWithAuthor } from "@/entities/post/model/types"

export const postsAtom = atom<IPost[]>([])

export const postsLoadingAtom = atom<boolean>(false)

export const postsTotalAtom = atom<number>(0)

export const selectedPostAtom = atom<IPostWithAuthor | null>(null)
