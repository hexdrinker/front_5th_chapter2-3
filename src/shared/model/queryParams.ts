import { atom } from "jotai"

const skipAtom = atom<number>(0)
const limitAtom = atom<number>(10)
const searchQueryAtom = atom<string>("")
const sortByAtom = atom<string>("")
const sortOrderAtom = atom<string>("asc")
const tagAtom = atom<string>("")

export { skipAtom, limitAtom, searchQueryAtom, sortByAtom, sortOrderAtom, tagAtom }
