import { atom } from "jotai"
import { ITag } from "@/entities/tag/model/types"

export const tagsAtom = atom<ITag[]>([])
