import { atom } from "jotai"
import { IUserDetail } from "@/entities/user/model/types"

export const selectedUserAtom = atom<IUserDetail | null>(null)
