import { IUserListResponse } from "@/entities/user/model/types"

const selectUserList = async (): Promise<IUserListResponse> => {
  const response = await fetch(`/api/users?limit=0&select=username,image`)
  const data = await response.json()
  return data
}

const selectUserItem = async (id: number) => {
  const response = await fetch(`/api/users/${id}`)
  const data = await response.json()
  return data
}

export { selectUserList, selectUserItem }
