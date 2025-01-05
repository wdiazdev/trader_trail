import { useQuery, UseQueryResult } from "@tanstack/react-query"
import agent from "../api/agent"
import { AccountsData, TradesData } from "../types"

export default function useGetAccounts(
  access_token: string | undefined,
  userId: string,
  accountId: string,
): {
  accountsQuery: UseQueryResult<{
    data: AccountsData[] | undefined
    message: string
    statusCode: number
    success: boolean
  }>
  tradesQuery: UseQueryResult<{
    data: TradesData | undefined
    message: string
    statusCode: number
    success: boolean
  }>
} {
  return {
    accountsQuery: useQuery({
      queryKey: ["getAccounts", userId],
      queryFn: async () => {
        return await agent.Account.getAllAccounts()
      },
      enabled: !!access_token && !!userId,
    }),
    tradesQuery: useQuery({
      queryKey: ["getTrades", accountId],
      queryFn: async () => {
        return await agent.Trade.getTrades(accountId)
      },
      enabled: !!access_token && !!accountId,
    }),
  }
}
