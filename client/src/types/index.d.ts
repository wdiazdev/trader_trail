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

export interface UserAccount {
  accountId: string
  accountName: string
  nickname: string
  createdAt: string
}

export interface SelectOverlayOption {
  label: string
  description: string | number
}
