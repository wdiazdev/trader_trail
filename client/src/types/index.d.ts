interface ApiResponse<T> {
  success: boolean
  statusCode: number
  message: string
  data?: T
}

export interface User {
  _id: string
  token: string
}

interface UserAccount {
  accountId: string
  nickname: string
  createdAt: string
}
