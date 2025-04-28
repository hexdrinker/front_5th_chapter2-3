import { IApiSelectPostItem } from "@/entities/post/model/types"

interface IPostItem extends Omit<IApiSelectPostItem, "views"> {
  // TODO: 추후 다른 interface로 분리해야함.
  author: {
    id: number
    username: string
    image: string
  }
}

export type { IPostItem }
