interface IUser {
  id: number
  username: string
  image: string
}

interface IUserListResponse {
  users: IUser[]
  total: number
  skip: number
  limit: number
}

interface IUserDetail {
  image: string
  username: string
  firstName: string
  lastName: string
  age: number
  email: string
  phone: string
  address: {
    address: string
    city: string
    state: string
  }
  company: {
    name: string
    title: string
  }
}

export type { IUser, IUserListResponse, IUserDetail }
