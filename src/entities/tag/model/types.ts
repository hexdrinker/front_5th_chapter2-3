interface ITag {
  slug: string
  name: string
  url: string
}

type ITagListResponse = ITag[]

export type { ITag, ITagListResponse }
