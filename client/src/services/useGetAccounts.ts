import { useQuery, UseQueryResult } from "@tanstack/react-query"
import agent from "../api/agent"
import { Trade, UserAccount } from "../types"

export default function useGetAccounts(
  access_token: string | undefined,
  userId: string,
  accountId: string,
): {
  accountsQuery: UseQueryResult<{
    data: UserAccount[] | undefined
    message: string
    statusCode: number
    success: boolean
  }>
  tradesQuery: UseQueryResult<{
    data: Trade[] | undefined
    message: string
    statusCode: number
    success: boolean
  }>
} {
  return {
    accountsQuery: useQuery({
      queryKey: ["getAccounts", userId],
      queryFn: async () => {
        return await agent.Account.getAccounts(userId)
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
