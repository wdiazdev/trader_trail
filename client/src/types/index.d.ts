interface ApiResponse<T> {
  success: boolean
  statusCode: number
  message: string
  data?: T
}

export interface User {
  userId: string
  access_token: string
}

export interface AccountsData {
  accountId: string
  accountName: string
  nickname: string
  createdAt: string
  userId: string
}
export interface Trade {
  tradeId: string
  amount: number
  createdAt: string
}

export interface BestWorstDay {
  bestDay: {
    date: Date
    amount: number
  } | null
  worstDay: {
    date: Date
    amount: number
  } | null
}

export interface TradesData {
  accountId: string
  balance: number | null
  totalTrades: number | null
  avgWin: number | null
  avgLoss: number | null
  bestWorstDay: BestWorstDay
  trades: Trade[]
}

export interface SelectOverlayOption {
  label: string
  description: string | number
}
