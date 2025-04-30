import { atom } from "jotai"

export const showAddDialogAtom = atom(false)
export const showEditDialogAtom = atom(false)
export const showDetailDialogAtom = atom(false)
export const newPostAtom = atom({ title: "", body: "", userId: 1 })
export const searchParamsAtom = atom({
  limit: 10,
  skip: 0,
  searchQuery: "",
  sortBy: "none",
  sortOrder: "asc",
  tag: "",
})
